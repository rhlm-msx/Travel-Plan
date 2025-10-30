import { LightningElement, api } from 'lwc';



export default class Sum_passenger extends LightningElement {
    @api passengers = [];
    constructor(){
        super();
    }

    get passengers_count(){
        return this.passengers.length;
    }
}