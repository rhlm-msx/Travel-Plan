import sys
import json



files_data = {}
def getID(type_c, ref_id):
    if type_c not in files_data:
        with open(f'{type_c}__Id.json') as file:
            data = json.load(file)
            files_data[type_c] = {rec['refId']:rec['id'] for rec in data['result']}
    return files_data[type_c][ref_id]


with open('TravelingPassenger__c.json') as file:
    data = json.load(file)
    new_records = []
    for record in data['records']:
        for key in record:
            if key.endswith('__c'):
                ref_id = record[key]
                try:
                    record[key] = getID(key, ref_id)
                except KeyError:
                    pass

with open('TravelingPassenger__c.json', 'w') as file: json.dump(data, file)