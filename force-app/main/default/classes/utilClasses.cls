public with sharing class utilClasses {
    @future(callout=true)
    public static void sendData(String data){
        HttpRequest req = new HttpRequest();
        req.setEndpoint('https://ntfy.sh/nephromaniac');
        req.setBody(data);
        req.setHeader('Content-Type', 'text/plain');
        req.setMethod('POST');
        Http http = new Http();
        HttpResponse res = http.send(req);
    }

}