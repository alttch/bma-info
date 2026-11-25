# Standalone search preview

Optional Pagefind 1.6.0 search on top of the existing Sphinx HTML. The normal
ReadTheDocs build and `make html` are unchanged. All search assets are local;
no external search API is used.

## Build on v1

The legacy `venv` points at a replaced system Python. Use an isolated Python 3.11:

```sh
uv venv --python 3.11 .venv-search
uv pip install --python .venv-search/bin/python -r requirements-search.txt
npm ci
make html-search SPHINXBUILD=./.venv-search/bin/sphinx-build
```

Output: `_build/local-search`. Only the main documentation content is indexed,
excluding navigation, breadcrumbs and footers. The search page accepts the
existing sidebar's `search.html?q=...` links and shows highlighted excerpts
and product labels. Up to 30 matching pages are shown per query. No build artifacts or dependencies belong in Git.

## Preview (manual, no autostart)

```sh
python3 -m http.server 9011 --bind 10.90.1.5 --directory _build/local-search
```

Open http://10.90.1.5:9011/search.html?q=nginx .
The entire output is static and can later be served from object storage.
This is an evaluation preview, not a public DNS/deployment change.

Queries use complete words (AND); quoted phrases are passed through to Pagefind.
This avoids its default prefix fallback returning unrelated matches for unknown
terms. Browser checks: nginx (8 pages + highlighted excerpts), unknown term
(no results), result URL, sidebar submit from a nested page, mobile overflow.
Existing cookie-consent JS can still call ipapi.co; this is unrelated to search.

## Publish

`make pub` runs the `info.bma.ai` RCI job with log following. Commit and push to
`actual` first; uncommitted local changes are intentionally not published.
RCI checks out GitHub, builds Sphinx + Pagefind, uploads into
`sites-static/info.bma.ai/releases/<commit>/`, downloads every object to verify
its content, then updates `info.bma.ai/active.json` last. Old releases remain.
R2 S3 credentials are read from a protected RCI-side rclone config and never stored in Git.
Worker source is `deploy/worker.js`; infrastructure is managed by BA Terraform.
Old `/en/latest/` and `/en/stable/` links redirect to the equivalent root path.

RCI currently has rclone 1.60.1: use `--s3-no-head` to avoid its incompatible
post-upload HEAD request on R2 (501). Uploads are still independently verified
by downloading all contents with `rclone check --download`.
