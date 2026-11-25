#!/usr/bin/env python3
"""Upload and byte-verify an isolated release, then switch active.json last."""
import json
import os
from pathlib import Path
import subprocess
import tempfile

root = Path("_build/local-search")
commit = subprocess.check_output(["git", "rev-parse", "HEAD"],text=True).strip()
assert len(commit) == 40 and all(c in "0123456789abcdef" for c in commit)
assert (root/"pagefind/pagefind.js").is_file() and (root/"search.html").is_file()
config = os.environ.get("BMA_RCLONE_CONFIG", str(Path.home()/".config/bma-info-rclone.conf"))
command = ["rclone", "--config", config, "--s3-no-head"]
destination = f"docs:sites-static/info.bma.ai/releases/{commit}"
files = [p for p in root.rglob("*") if p.is_file()]
# Copy only. Previous releases and unrelated site prefixes are never deleted.
subprocess.run(command+["copy",str(root),destination,"--transfers","8",
    "--metadata","--metadata-set","cache-control=public, max-age=300"],check=True)
# Download all uploaded objects and compare their contents against the build.
subprocess.run(command+["check",str(root),destination,"--download","--one-way"],check=True)
pointer=json.dumps({"commit":commit,"files":len(files)}).encode()
with tempfile.NamedTemporaryFile() as tmp:
    tmp.write(pointer)
    tmp.flush()
    target="docs:sites-static/info.bma.ai/active.json"
    subprocess.run(command+["copyto",tmp.name,target,"--metadata",
        "--metadata-set","content-type=application/json",
        "--metadata-set","cache-control=no-cache"],check=True)
    if subprocess.check_output(command+["cat",target]) != pointer:
        raise RuntimeError("Active release verification failed")
print(f"Published and byte-verified {len(files)} files, commit {commit}",flush=True)
