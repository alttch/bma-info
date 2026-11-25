#!/usr/bin/env python3
"""Upload and byte-verify an isolated release, then atomically switch active.json."""
import concurrent.futures
import hashlib
import json
import mimetypes
import os
from pathlib import Path
import subprocess
import urllib.error
import urllib.parse
import urllib.request

ACCOUNT = "74a9f6dce51bf7af31f5bdfe7a4b4ce2"
BASE = f"https://api.cloudflare.com/client/v4/accounts/{ACCOUNT}/r2/buckets/sites-static/objects/"
token = Path(os.environ.get("BMA_CF_TOKEN_FILE", str(Path.home()/".config/bohemia-automation/cloudflare-api-token"))).read_text().strip()
root = Path("_build/local-search")
commit = subprocess.check_output(["git", "rev-parse", "HEAD"],text=True).strip()
assert len(commit) == 40 and all(c in "0123456789abcdef" for c in commit)
assert (root/"pagefind/pagefind.js").is_file() and (root/"search.html").is_file()
prefix = f"info.bma.ai/releases/{commit}/"

def call(key, data=None, mime=None):
    headers = {"Authorization": "Bearer "+token}
    if data is not None:
        headers.update({"Content-Type": mime or "application/octet-stream", "Cache-Control": "public, max-age=300"})
    request = urllib.request.Request(BASE+urllib.parse.quote(key,safe="/"),data=data,headers=headers,method="GET" if data is None else "PUT")
    with urllib.request.urlopen(request, timeout=120) as response:
        body=response.read()
    if data is not None:
        result=json.loads(body)
        if not result.get("success"):
            raise RuntimeError("R2 rejected upload for "+key)
    return body

def upload(path):
    key=prefix+path.relative_to(root).as_posix()
    data=path.read_bytes()
    mime=mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    if path.suffix == ".wasm": mime="application/wasm"
    call(key,data,mime)
    if hashlib.sha256(call(key)).digest() != hashlib.sha256(data).digest():
        raise RuntimeError("Verification failed: "+key)
    return len(data)

files=sorted(p for p in root.rglob("*") if p.is_file())
with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
    sizes=list(pool.map(upload,files))
# The previous release is retained. No deletion or in-place partial publication.
pointer=json.dumps({"commit":commit,"files":len(files)}).encode()
call("info.bma.ai/active.json",pointer,"application/json")
if call("info.bma.ai/active.json") != pointer:
    raise RuntimeError("Active release verification failed")
print(f"Published and byte-verified {len(files)} files, {sum(sizes)} bytes, commit {commit}",flush=True)
