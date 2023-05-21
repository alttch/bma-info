#!/usr/bin/env python3

import rapidtables
import yaml

from collections import OrderedDict

with open('fieldbus.yml') as fh:
    data = yaml.safe_load(fh)

f_data = []

for d in data:
    fd = OrderedDict()
    name = d['name']
    if '\n' in name:
        n = name.split('\n')
        name = '\n\n'.join(n)
    fd['Protocol'] = name
    fd['Devices supported'] = '\n\n'.join(d['devices'])
    fd['Status'] = d['status']
    f_data.append(fd)

table = rapidtables.make_table(f_data,
                               allow_multiline=True,
                               tablefmt='rstgrid')
print(table)
