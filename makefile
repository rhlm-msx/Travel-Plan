scratch:
	sf org create scratch -f config/project-scratch-def.json -d -a travel_scratch

delete:
	sf org delete scratch -o travel_scratch

push:
	sf project deploy start -o travel_scratch

pull:
	sf project retrieve start -o travel_scratch

open:
	sf org open
live:
	sf lightning dev app -n 'Travel Plan' -t desktop -o travel_scratch
