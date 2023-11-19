#!/usr/bin/env python3

import yaml

with open('./sdk/abi_ops.yml') as fh:
    ops = yaml.safe_load(fh)

for (op, info) in ops.items():
    des = info['des'].capitalize()
    if not des.endswith('.'):
        des += '.'
    data = info.get('dat')
    ret = info.get('ret')
    if data:
        data = data[0].lower() + data[1:]
    if ret:
        ret = ret[0].lower() + ret[1:]
    print(f'.. _eva4_sdk_abi_svc_op_{op.lower()}:\n')
    print(op)
    print('-' * len(op))
    print(f'\n{des}\n')
    print(f'* Operation code: **{info["code"]}**')
    print(f'* FFI buffer data: {data if data else "none"}')
    print(f'* Returns: {ret if ret else "none"}')
    print(f'* Bus required: {"**yes**" if info.get("bus") else "no"}')
    print('\n')
