public with sharing class TravelsDataController {
    @AuraEnabled(cacheable=true)
    public static List<Travel__c> getTravelData() {
        return [SELECT Id, Name, Source__c, Start_date__c, End_date__c FROM Travel__c];
    }

    @AuraEnabled(cacheable=true)
    public static List<TravelingPassenger__c> getPassengers(Id travelId){
        try {
            return [SELECT Id, Passenger__r.Name FROM TravelingPassenger__c WHERE Travel__c = :travelId];
        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }

    @AuraEnabled
    public static void deleteRecord(Id travelId){
        List<TravelingPassenger__c> tps = [ SELECT Id, Travel__c FROM TravelingPassenger__c WHERE Travel__c = :travelId ];
        List<Travel__c> travels = [SELECT Id FROM Travel__c WHERE Id = :travelId ];
        try{
            delete tps;
            delete travels;
        }catch(DmlException e){
            throw new AuraHandledException('failed to delete' + e.getMessage());
        }
    }
}