Travel__c.json:
	cd ..; python synthesize-data.py Travel__c 20

Passenger__c.json:
	cd ..; python synthesize-data.py Passenger__c 20

TravelingPassenger__c.json:
	cd ..; python synthesize-data.py TravelingPassenger__c 20

Travel__c__Id.json: Travel__c.json
	sf data import tree --files Travel__c.json --json > Travel__c__Id.json

Passenger__c__Id.json: Passenger__c.json
	sf data import tree --files Passenger__c.json --json > Passenger__c__Id.json

TravelingPassenger__c__Id.json: Travel__c__Id.json Passenger__c__Id.json TravelingPassenger__c.json
	python prepare.py
	sf data import tree --files TravelingPassenger__c.json --json > TravelingPassenger__c__Id.json

all: TravelingPassenger__c__Id.json
clean:
	rm *.json
