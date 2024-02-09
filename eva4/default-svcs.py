#!/usr/bin/env python3

import yaml
import jsonschema
import subprocess

SCHEMA = {
    'type': 'array',
    'items': {
        'type': 'object',
        'properties': {
            'nam': {},
            'grp': {},
            'exe': {},
            'des': {},
            'ins': {},
            'txt': {},
            'tpl': {},
            'api': {},
            'xtr': {},
            'ent': {},
        },
        'required': ['nam', 'exe', 'des'],
        'additionalProperties': False
    }
}

GROUPS = [
    ('aaa', 'Authentication, Authorization and Accounting'),
    ('auto', 'SCADA automation'),
    ('db', 'Databases and data storages'),
    ('repl', 'Data replication'),
    ('sim', 'Digital twins and process simulation'),
    ('fb', 'Fieldbus and external equipment'),
    ('system', 'System services'),
    ('hmi', 'User interfaces, HMI'),
    ('misc', 'Other services'),
]

GROUP_DOCS = {
    'aaa': 'aaa',
    'auto': 'auto/index',
    'repl': 'replication',
    'hmi': 'ui',
    'sim': '../sim/index',
    'fb': 'fieldbus'
}

group_codes = set([g[0] for g in GROUPS])

with open('default_svcs.yml') as fh:
    svcs = yaml.safe_load(fh)

jsonschema.validate(svcs, SCHEMA)

svcs = sorted(svcs, key=lambda k: k['des'])

svc_groups = dict()
for svc in svcs:
    grp = svc.get('grp', 'misc')
    if grp not in group_codes:
        raise ValueError(f'invalid service group: {grp}')
    svc_groups.setdefault(svc.get('grp', 'misc'), []).append(svc)

with open('include/autogen/core_svcs_toc.rst', 'w') as tfh:
    print('.. toctree::', file=tfh)
    # print('    :caption: The core and services', file=tfh)
    print('    :hidden:', file=tfh)
    print('    :maxdepth: 1', file=tfh)
    print(file=tfh)
    print('    core', file=tfh)
    # print('    services', file=tfh)
    with open('include/autogen/default_svcs.rst', 'w') as fh:
        for grp in GROUPS:
            gs = svc_groups.get(grp[0])
            if gs:
                print(grp[1], file=fh)
                print('-' * len(grp[1]), file=fh)
                print(file=fh)
                print('.. list-table::', file=fh)
                print(file=fh)
                print('   * - Description', file=fh)
                print('     - Suggested name', file=fh)
                print('     - Executable', file=fh)
                print('     - Deployed', file=fh)
                for svc in gs:
                    enterprise = svc.get('ent', False)
                    nam = svc['nam']
                    exe = svc['exe']
                    exe_link = exe.replace('venv/bin/',
                                           'svc/').replace('path/to/', 'svc/')
                    des = svc['des']
                    nam = f':doc:`{nam}<{exe_link}>`'
                    des = f':doc:`{des}<{exe_link}>`'
                    ins = svc.get('ins', '')
                    if not ins and enterprise:
                        ins = 'requires :doc:`enterprise`'
                    if ins.startswith('py:'):
                        pymod = ins[3:]
                        ins = (
                            f'requires `{pymod} <https://pypi.org/project/{pymod}/>`_ '
                            'Python module')
                    else:
                        pymod = None
                    print(f'   * - {des}', file=fh)
                    print(f'     - {nam}', file=fh)
                    print(f'     - {exe}', file=fh)
                    print(f'     - {ins}', file=fh)
                    print(f'    {exe_link}', file=tfh)
                    with open(f'./{exe_link}.rst', 'w') as sfh:
                        print(svc['des'], file=sfh)
                        print('*' * len(svc['des']), file=sfh)
                        print(file=sfh)
                        print('.. contents::', file=sfh)
                        print(file=sfh)
                        txt = svc.get('txt')
                        if enterprise:
                            txt = '**Requires** :doc:`../enterprise`.\n\n' + txt
                        if txt:
                            print(txt, file=sfh)
                            print(file=sfh)
                        if pymod:
                            print(f"""Installing/updating
===================

{svc["des"]} is not included into EVA ICS distribution. To install/update it,
either edit "eva/config/python-venv" :doc:`registry<../registry>` key, specify
the desired version in "extra" section (e.g. *{pymod}>=0.0.1*) and rebuild the
Python virtual environment (*/opt/eva4/sbin/venvmgr build*). Or execute:

.. code:: shell

    /opt/eva4/sbin/venvmgr add {pymod}
    # or 
    /opt/eva4/sbin/venvmgr add {pymod}==N # where N = version number

The latest eva-shell version number can be obtained from
https://pypi.org/project/{pymod}/
""",
                                  file=sfh)
                        tpl = svc.get('tpl')
                        if tpl is not None:
                            print('Setup', file=sfh)
                            print('=====', file=sfh)
                            snam = svc['nam']
                            gnam = snam
                            if snam.endswith('N'):
                                snam = snam[:-1] + '1'
                                gnam = gnam[:-1]
                            # tpl_dir = '' if enterprise else 'EVA_DIR/share/svc-tpl/'
                            tpl_dir = 'EVA_DIR/share/svc-tpl/'
                            tpl_dir_p = '/opt/eva4/share/svc-tpl/'
                            # tpl_dir_p = 'path/to/' if enterprise \
                            # else '/opt/eva4/share/svc-tpl/'
                            print(f"""
Use the template *{tpl_dir}{tpl}*:

.. literalinclude:: ../svc-tpl/{tpl}
   :language: yaml

Create the service using :ref:`eva4_eva-shell`:

.. code:: shell

    eva svc create {snam} {tpl_dir_p}{tpl}

or using the bus CLI client:

.. code:: shell

    cd /opt/eva4
    cat DEPLOY.yml | ./bin/yml2mp | \\
        ./sbin/bus ./var/bus.ipc rpc call eva.core svc.deploy -

(see :ref:`eva.core::svc.deploy<eva4_eva.core__svc.deploy>` for more info)
""",
                                  file=sfh)
                        api = svc.get('api')
                        if api:
                            api_path = f'/opt/eva4-enterprise/{api}' if enterprise \
                                    else f'/opt/eva4/{api}'
                            print('/opt/eva4/sbin/eapigen', gnam, api_path)
                            p = subprocess.Popen(
                                ['/opt/eva4/sbin/eapigen', gnam, api_path],
                                stdout=subprocess.PIPE)
                            stdout, _ = p.communicate()
                            if p.returncode != 0:
                                raise RuntimeError(svc['nam'])
                            print(file=sfh)
                            print(stdout.decode().rstrip(), file=sfh)
                        xtr = svc.get('xtr')
                        if xtr:
                            print(file=sfh)
                            print(xtr, file=sfh)
                print(file=fh)
                group_doc = GROUP_DOCS.get(grp[0])
                if group_doc:
                    print(f'See also: :doc:`{group_doc}`', file=fh)
                print(file=fh)
