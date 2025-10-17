import sys
import tempfile
import os
import sphinx.ext.autodoc
from textwrap import dedent
from types import SimpleNamespace

_d = SimpleNamespace(result='')


def my_add_line(f):

    def do(self, line: str, source: str, *lineno: int) -> None:
        _d.result += self.indent + line + '\n'
        return f(self, line, source, *lineno)

    return do


sphinx.ext.autodoc.Documenter.add_line = my_add_line(
    sphinx.ext.autodoc.Documenter.add_line)

cur_dir = os.getcwd()

try:
    tpl = sys.argv[1]
    out = sys.argv[2]
except:
    print(f'Usage: {sys.argv[0]} RST_TPL OUTPUT [libpaths-comma-separated]')
    exit(0)

try:
    paths = sys.argv[3]
except IndexError:
    paths = ''

with open(tpl) as fh:
    rst = fh.read()

libpaths = paths.split(',')

print(f'Input file: {tpl}')
print(f'Output file: {out}')
print(f'Lib paths: {" ".join(libpaths)}')

with tempfile.TemporaryDirectory() as tmpd:
    os.chdir(tmpd)
    print(f'Working in : {tmpd}')
    with open('conf.py', 'w') as fh:
        fh.write(
            dedent("""
            import sys
            {}
            extensions = ['sphinx.ext.autodoc', 'sphinx.ext.napoleon']
            napoleon_google_docstring = True
            napoleon_include_init_with_doc = False
            napoleon_include_private_with_doc = False
            napoleon_include_special_with_doc = True
            napoleon_use_admonition_for_examples = False
            napoleon_use_admonition_for_notes = False
            napoleon_use_admonition_for_references = False
            napoleon_use_ivar = False
            napoleon_use_param = True
            napoleon_use_rtype = True
            autoclass_content = 'both'
            language = 'en'
            pygments_style = 'sphinx'
            """).format('\n'.join(
                [f'sys.path.insert(0, "{d}")' for d in libpaths])))
    with open('index.rst', 'w') as fh:
        fh.write(rst)
    sys.argv = ['./pydoc2rst', '-b', 'text', '-d', '_doctrees', '.', '_out']
    from sphinx.cmd.build import main
    code = main()

os.chdir(cur_dir)

if not code:
    if out == '-':
        print(_d.result)
    else:
        with open(out, 'w') as fh:
            fh.write(_d.result)
        print('-' * 30)
        print(f'{out} generated')
sys.exit(code)
