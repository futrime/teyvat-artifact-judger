import csv
import json
import os

OUTPUT_FILENAME = 'data.json'

csv_filename_list = []
for filename in os.listdir('data'):
    if os.path.splitext(filename)[-1] == '.csv':
        csv_filename_list.append(filename)

data = {}
for csv_filename in csv_filename_list:
    with open(f'data/{csv_filename}', encoding='utf-8') as csv_file:
        data_unit = []
        reader = csv.DictReader(csv_file)
        for row in reader:
            row['副属性'] = row['副属性'].split('/')
            row['角色'] = row['角色'].split('/')
            data_unit.append(row)
        data[os.path.splitext(csv_filename)[0]] = data_unit

with open(OUTPUT_FILENAME, 'w', encoding='utf-8') as f:
    json.dump(data, f, indent=4, ensure_ascii=False)
