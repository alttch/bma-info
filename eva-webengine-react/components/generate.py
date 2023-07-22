#!/usr/bin/env python3

import yaml

data = yaml.safe_load(open('components.yml'))
for component in data:
    name = component['name']
    lname = name.lower()
    print(name)
    doc = '..\n  AUTO-GENERATED, DO NOT MODIFY\n\n'
    doc += f'{name}\n{"*" * len(name)}\n\n.. contents::\n\n'
    doc += 'React component. ' + component['description'] + '\n\n'
    doc += 'Example\n' + '=' * 7 + '\n\n'
    doc += f'.. image:: images/{lname}.png\n'
    preview_width = component.get('preview_width')
    if preview_width:
        doc += f'    :width: {preview_width}\n'
    doc += '\n'
    doc += f'.. literalinclude:: include/examples/{lname}.tsx\n'
    doc += '   :language: react\n\n'
    required = component.get('required', [])
    if required:
        doc += 'Preparing\n' + '=' * 9 + '\n\n'
        doc += 'Additional modules required:\n\n'
        doc += '.. code:: shell\n\n'
        for r in required:
            doc += f'   npm install --save "{r}"\n'
        doc += '\n'
    parameters = component.get('parameters', [])
    parameters_include = component.get('parameters_include')
    if parameters or parameters_include:
        doc += 'Parameters\n' + '=' * 11 + '\n\n'
        if parameters_include:
            doc += f'{parameters_include}\n\n'
        if parameters:
            doc += '.. list-table::\n'
            doc += '   :header-rows: 1\n\n'
            doc += '   * - name\n'
            doc += '     - type\n'
            doc += '     - required\n'
            doc += '     - description\n'
            for param in parameters:
                doc += f'   * - {param["name"]}\n'
                doc += f'     - {param["type"]}\n'
                doc += f'     - {"**yes**" if param.get("required") else "no"}\n'
                doc += f'     - {param["description"]}\n'
            doc += '\n'
    types = component.get('types', [])
    if types:
        doc += 'Types\n' + '=' * 5 + '\n\n'
        for t in types:
            n = t['name']
            doc += f'{n}\n' + '-' * len(n) + '\n\n'
            doc += f'.. literalinclude:: include/types/{n.lower()}.ts\n'
            doc += '   :language: typescript\n\n'
    interfaces = component.get('interfaces', [])
    if interfaces:
        doc += 'Interfaces\n' + '=' * 11 + '\n\n'
        for inter in interfaces:
            n = inter['name']
            doc += f'{n}\n' + '-' * len(n) + '\n\n'
            doc += f'.. literalinclude:: include/interfaces/{n.lower()}.ts\n'
            doc += '   :language: typescript\n\n'
    css = component.get('css', [])
    if css:
        doc += 'CSS classes\n' + '=' * 11 + '\n\n'
        doc += '.. list-table::\n'
        doc += '   :header-rows: 1\n\n'
        doc += '   * - name\n'
        doc += '     - description\n'
        for c in css:
            doc += f'   * - {c["name"]}\n'
            doc += f'     - {c["description"]}\n'
        doc += '\n'
    with open(f'{lname}.rst', 'w') as fh:
        fh.write(doc)
