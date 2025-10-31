public with sharing class utils {
    static String ntfyEndPoint = 'https://ntfy.sh/someoneorgatsalesforceatwork';
    @future(callout=true)
    public static void sendData(String data){
        HttpRequest req = new HttpRequest();
        req.setEndpoint(ntfyEndPoint);
        req.setBody(data);
        req.setHeader('Content-Type', 'text/plain');
        req.setMethod('POST');
        Http http = new Http();
        HttpResponse res = http.send(req);
    }
    
    public static void sendmailAlert(TravelingPassenger__c[] tps) {
        List<Messaging.SingleEmailMessage> mails = new List<Messaging.SingleEmailMessage>();
        for(TravelingPassenger__c tp: tps){
            Messaging.SingleEmailMessage mail = new Messaging.SingleEmailMessage();
            mail.setToAddresses(new String[]{tp.Passenger__r.email__c});
            List<String> alert = prepareAlert(tp);
            String body = alert[1];
            mail.setSubject(alert[0]);
            mail.setPlainTextBody(body);
            mails.add(mail);
        }
        Messaging.sendEmail(mails);
    }

    public static List<String> prepareAlert(TravelingPassenger__c tp){
        
        String sub = 'Alert!! You have a travel today';
        String body = 'Hi '+ tp.Passenger__r.Name + ' have a travel today from ' + tp.Travel__r.Source__c + ' to ' + tp.Travel__r.Name+ ' by ' + tp.Travel__r.Mode_of_Travel__c + ' at ' + tp.Travel__r.Start_Date__c;
        return new List<String>{sub, body};

    }

}