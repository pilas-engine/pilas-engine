import json
from datetime import datetime
from xml.etree import ElementTree

APPDATA_PATH = 'extras/ar.com.pilas_engine.App.metainfo.xml'


def get_version_from_package_json():
    with open('package.json') as f:
        data = json.load(f)
        return data['version']

def get_version_date():
    return datetime.today().strftime('%Y-%m-%d')

def sort_children_by(parent, attr):
    parent[:] = sorted(parent, reverse=True, key=lambda child: child.get(attr))

def main():
    new_version = get_version_from_package_json()

    tree = ElementTree.parse(APPDATA_PATH)
    root = tree.getroot()
    releases = root.find('releases')

    already_exists = False
    for r in releases:
        if r.attrib['version'] == new_version:
            already_exists = True
            break

    if already_exists:
        return

    date = get_version_date()
    ElementTree.SubElement(releases, 'release', { 'version': new_version, 'date': date })
    sort_children_by(releases, 'version')
    ElementTree.indent(releases, level=1)

    # ElementTree.dump(releases)
    tree.write(APPDATA_PATH, encoding='utf-8', xml_declaration=True)

if __name__ == '__main__':
    main()
