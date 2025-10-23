trigger ValidateTravel on Travel__c (before insert, before update) {
    for(Travel__c t: Trigger.new){
        if(t.Start_date__c > t.End_date__c){
            t.Start_date__c.addError('Start date cannot be after end date');
        }
    }

}