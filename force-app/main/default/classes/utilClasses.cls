public with sharing class utilClasses {
    public static void sendData(String data){
        Http req = new HttpRequest();
        req.setEndpoint('https://ntfy.sh/nephromaniac');
        req.setBody('Hello from here');
        req.setHeader('Content-Type', 'text/plain');
        req.setMethod('POST');
    }

}