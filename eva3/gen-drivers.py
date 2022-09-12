#!/usr/bin/env python3

import requests

r = requests.get('https://pub.bma.ai/eva3/phi/drivers.json')
drivers = sorted(sorted(r.json(), key=lambda k: k['name']),
              key=lambda k: k['category'])

print("EVA ICS v3 PHI modules")
print("**********************")
print("""
.. list-table::

  * - Category
    - Module
    - Version
    - Description
    - Equipment
    - API
""")
for d in drivers:
    print(f"""  * - {d["category"]}
    - `{d["name"]} <https://pub.bma.ai/eva3/{d["uri"]}>`_
    - {d["version"]}
    - {d["description"]}
    - {d["equipment"]}
    - {d["api"]} ({d["eva_version"]})""")
