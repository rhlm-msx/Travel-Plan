import { LightningElement } from 'lwc';

export default class Widget_maplocations extends LightningElement {
    destination = 'Lucknow'
    source = 'Pune'
    
    get mapMarkers(){
        return [{
            location: {
                City: this.source,
                Country: 'India'
            } 
        }, {

            location: {
                City: this.destination,
                Country: 'India'
            } 
        }]
    }
}