import json

"""
To run this: Generate a file called "depends.json" that contains the output of
`yarn list --json`, place that file in the same folder as this one, then run
this file as `python3 depends.py`
"""

js = None

with open("depends.json", "r") as j:
    js = json.loads(j.read())

def read_dependencies(js):
    """
    Gather all dependencies, then for each of those get the name and the number
    of children dependencies. This will then print the results out.
    """
    _, data = js
    _, tree = js[data]
    depends = js[data][tree]

    dependencies = []

    for dependency in depends:
        children = dependency['children']
        dependencies.append((dependency['name'], len(children)))

    dependencies = sorted(dependencies, key=lambda dep: dep[1], reverse=True)
    print("\n".join(f"Dependency {dep[0]} has {dep[1]} children dependencies"
        for dep in dependencies))


read_dependencies(js)

