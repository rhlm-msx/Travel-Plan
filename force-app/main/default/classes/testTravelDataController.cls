@isTest
public class testTravelDataController {
    
     @testSetup
     static void setupData() {
          Travel__c travel = new Travel__c(
              Name = 'Pune',
              Source__c = 'Delhi',
              Start_date__c = Date.today(),
              End_date__c = Date.today().addDays(5),
              Mode_of_Travel__c = 'Bus'
          );
          insert travel;

         Passenger__c passenger = new Passenger__c(
             Name = 'John Doe',
             Email__c = 'john@example.com',
             Mobile__c = '9999999999'
         );
         insert passenger;
        TravelingPassenger__c tp = new TravelingPassenger__c(
             Travel__c = travel.Id,
             Passenger__c = passenger.Id
         );
         insert tp;
     }


    @isTest
    static void testGetTravelData() {
        Test.startTest();
        List<Travel__c> travels = TravelsDataController.getTravelData();
        Test.stopTest();

        System.assertNotEquals(0, travels.size(), 'Should return at least one Travel record');
    }

    @isTest
    static void testGetPassengers() {
        Travel__c travel = [SELECT Id FROM Travel__c LIMIT 1];

        Test.startTest();
        List<TravelingPassenger__c> passengers = TravelsDataController.getPassengers(travel.Id);
        Test.stopTest();

        System.assertNotEquals(0, passengers.size(), 'Should return at least one passenger');
        System.assertNotEquals(null, passengers[0].Passenger__r.Name, 'Passenger name should not be null');
    }

    @isTest
    static void testDeleteRecord() {
        Travel__c t = new Travel__c(
            Name = 'Delete Me',
            Source__c = 'Mumbai',
            Start_date__c = Date.today(),
            End_date__c = Date.today().addDays(3),
            Mode_of_Travel__c = 'Train'
        );
        insert t;

        Test.startTest();
        TravelsDataController.deleteRecord(t.Id);
        Test.stopTest();

        Integer countAfterDelete = [SELECT COUNT() FROM Travel__c WHERE Id = :t.Id];
        System.assertEquals(0, countAfterDelete, 'Travel record should be deleted');
    }
}