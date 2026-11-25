"""Remove only the generated isolated search output before each CI build."""
from pathlib import Path
import shutil
root = Path.cwd().resolve()
for name in ("_build/local-search", "_build/local-search-doctrees"):
    path = root / name
    if path.is_symlink():
        raise RuntimeError("Refusing symlinked build output")
    if path.exists():
        shutil.rmtree(path)
