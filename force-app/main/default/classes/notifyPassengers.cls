public with sharing class notifyPassengers implements Schedulable{
   public void execute(SchedulableContext sc){
    Datetime today = Datetime.now().date();
    Datetime tommorrow = today.addDays(1);

    List<TravelingPassenger__c> tps = [SELECT Id, Travel__c, Travel__r.Name, Travel__r.Source__c, Passenger__c, Passenger__r.Name,Passenger__r.email__c, Travel__r.Start_Date__c, Travel__r.Mode_of_Travel__c FROM TravelingPassenger__c WHERE Travel__r.Start_Date__c < :tommorrow AND Travel__r.Start_Date__c >= :today];
    utils.sendmailAlert(tps);
    for(TravelingPassenger__c tp: tps){
        List<String> data = utils.prepareAlert(tp);
        utils.sendData(data[0] + '\n' + data[1]);
    }
   }
}