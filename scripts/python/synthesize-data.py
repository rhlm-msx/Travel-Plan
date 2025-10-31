import sys
import os
import json
from bs4 import BeautifulSoup
from bs4.element import Tag
import faker
import random

EMAIL_DEFAULT = "boparil396@dropeso.com"
objectmapper = {}
objects_path = '../../force-app/main/default/objects'

def getSampleData(field):
    label = field['fullName'].split('__c')[0].strip()
    type_c = field['type']
    dummy = faker.Faker('en_IN')
    sampler = {
        'name': set(['name']),
        'city': set(['destination', 'source']),
        'phone_number': set(['mobile']),
        'email': set(['email']),
        'date_time': set(['start_date', 'end_date'])
    }
    transformer = {
        'autonumber': lambda x: None,
        'text': lambda x: x,
        'picklist': lambda x: random.choice([ a['fullName'] for a in x['valueSet']]),
        'datetime': lambda x: str(x).replace(' ', 'T'),
        'phone': lambda x: x,
        'email': lambda x: EMAIL_DEFAULT if EMAIL_DEFAULT else x,
        'masterdetail': lambda x: objectmapper.get(x['label'], 'Ref1')
    }
    res = field
    found = False
    for key, values in sampler.items():
        if label.lower() in values:
            res = getattr(dummy, key)()
            found = True
            break
    if not found :
        print(f'[INFO]: {label.lower()}, not exists in the sampler dict values')
    if transform := transformer.get(type_c.lower(), None):
        return transform(res)
    return None
    


class DummyObject:
    def __init__(self, path):
        fields_path = f'{path}/fields'
        object_metadata_path = [ f'{path}/{x}' for x in os.listdir(path) if x.endswith('xml') ][0]
        with open(object_metadata_path) as file:
            data = file.read()
            self.handleObject(data)
        for p, s, files in os.walk(fields_path):
            for file_name in files:
                if file_name.endswith('xml'):
                    with open(f'{p}/{file_name}') as file:
                        data = file.read()
                        self.handleFields(data)
        remove_keys = []
        for key, field in self.fields.items():
            val = getSampleData(field)
            self.fields[key]['value'] = val
            if val == None: remove_keys += [ key ]

        for key in remove_keys:
            self.fields.pop(key)
                


    def __repr__(self):
        sfields = ''
        for key, field in self.fields.items():
            sfields += f'{key}:{field['type']} => {field.get('value', None)}\n'
        return f'{self.label}\n{sfields}'


    
    def handleObject(self, data):
        bs = BeautifulSoup(data, 'xml')
        self.suffix = '__c' if bs.find('CustomObject') != None else ''
        self.label = bs.find('label').decode_contents()
        objectmapper[self.label] = self
        self.fields = {}
        nf = bs.find('nameField')
        field = {}
        for child in nf.childGenerator():
            if type(child) is Tag:
                field[child.name] = child.text
        field['fullName'] = field['label']
        field['label'] = 'Name'
        field['suffix'] = ''
        self.fields[field['label']] = field

    def handleFields(self, data):
        bs = BeautifulSoup(data, 'xml')
        for field in bs.find_all('CustomField'):
            cfield = {}
            cfield['suffix']  = '__c'
            for child in field.childGenerator():
                if type(child) is Tag:
                    if child.name == 'valueSet':
                        values = []
                        for x in child.find_all('value'):
                            value = {}
                            for a in x.childGenerator():
                                if type(a) is Tag:
                                    value[a.name] = a.text
                            values += [value]
                        cfield['valueSet'] = values
                    else:
                        cfield[child.name] = child.text
            self.fields[cfield['fullName']] = cfield


    def getRecordJSON(self, index=1):
        return {
            'attributes': {
                'type': self.label + self.suffix,
                'referenceId': f'{self.label+self.suffix}Ref{index}'
            },
            **{ f'{name}': item['value'] if item['type'].lower() != 'masterdetail' else f'{name}Ref{index}' for name, item in self.fields.items()}
        }
                



try:
    object_name = sys.argv[1]
    object_count = int(sys.argv[2])
    json_data = {"records": [ DummyObject(f'{objects_path}/{object_name}').getRecordJSON(i) for i in range(1, object_count + 1) ]}
    with open(f'data/{object_name}.json', 'w') as file:
        file.write(json.dumps(json_data))
except Exception as e:
    print(f'[ERROR]: {e}')
    print(f'[FORMAT]: python {sys.argv[0]} "object_name" "count"')



