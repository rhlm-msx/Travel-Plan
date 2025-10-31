trigger oncreateTrip on TravelingPassenger__c (after insert, after update) {
   for(TravelingPassenger__c obj : Trigger.new){
    List<TravelingPassenger__c> trips = [SELECT Id, Travel__r.Name, Travel__r.Source__c FROM TravelingPassenger__c WHERE Id = :obj.Id];
   //  utilClasses.sendData((Trigger.isUpdate ? 'Updated Trip: ': 'New Trip: ') + trips[0].Travel__r.Source__c + '-->' + trips[0].Travel__r.Name) ;
   }
}