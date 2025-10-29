data/Travel__c.json:
	python synthesize-data.py Travel__c 20

data/Passenger__c.json:
	python synthesize-data.py Passenger__c 20

data/TravelingPassenger__c.json:
	python synthesize-data.py TravelingPassenger__c 20

data/Travel__c__Id.json: data/Travel__c.json
	sf data import tree --files data/Travel__c.json --json -o travel_scratch > data/Travel__c__Id.json

data/Passenger__c__Id.json: data/Passenger__c.json
	sf data import tree --files data/Passenger__c.json --json -o travel_scratch > data/Passenger__c__Id.json

data/TravelingPassenger__c__Id.json: data/Travel__c__Id.json data/Passenger__c__Id.json data/TravelingPassenger__c.json
	python prepare.py
	sf data import tree --files data/TravelingPassenger__c.json --json -o travel_scratch > data/TravelingPassenger__c__Id.json

all: data/TravelingPassenger__c__Id.json
clean:
	rm data/*.json
