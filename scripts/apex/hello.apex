// Use .apex files to store anonymous Apex.
// You can execute anonymous Apex in VS Code by selecting the
//     apex text and running the command:
//     SFDX: Execute Anonymous Apex with Currently Selected Text
// You can also execute the entire file by running the command:
//     SFDX: Execute Anonymous Apex with Editor Contents


Travel__c tc = [SELECT Id FROM Travel__c LIMIT 1];
for(TravelingPassenger__c tp : TravelsDataController.getPassengers(tc.Id)){
    System.debug(tp.Passenger__r.Name);
}