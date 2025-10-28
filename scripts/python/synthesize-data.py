import os
from bs4 import BeautifulSoup
from bs4.element import Tag
import faker
import random


objectmapper = {}

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
        'datetime': lambda x: x,
        'phone': lambda x: x,
        'email': lambda x: x,
        'masterdetail': lambda x: objectmapper.get(x['label'], None)
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
    






objects_path = 'force-app/main/default/objects'





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
        for key, field in self.fields.items():
            self.fields[key]['value'] = getSampleData(field)


    def __repr__(self):
        sfields = ''
        for key, field in self.fields.items():
            sfields += f'{key}:{field['type']} => {field.get('value', None)}\n'
        return f'{self.label}\n{sfields}'


    
    def handleObject(self, data):
        bs = BeautifulSoup(data, 'xml')
        self.label = bs.find('label').decode_contents()
        objectmapper[self.label] = self
        self.fields = {}
        nf = bs.find('nameField')
        field = {}
        for child in nf.childGenerator():
            if type(child) is Tag:
                field[child.name] = child.text
        field['fullName'] = field['label']
        self.fields[field['label']] = field

    def handleFields(self, data):
        bs = BeautifulSoup(data, 'xml')
        for field in bs.find_all('CustomField'):
            cfield = {}
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
            self.fields[cfield['label']] = cfield
                





print(DummyObject(f'{objects_path}/Travel__c'))
print(DummyObject(f'{objects_path}/Passenger__c'))
print(DummyObject(f'{objects_path}/TravelingPassenger__c'))
