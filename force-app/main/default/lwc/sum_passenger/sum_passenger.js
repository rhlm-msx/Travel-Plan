import { LightningElement } from 'lwc';


class Passenger {
    constructor(name, email, phone) {
        this.name = name;
    }
}

export default class Sum_passenger extends LightningElement {
    passengers = [];
    constructor(){
        super();
        this.passengers.push(new Passenger('Rahul Mishra1'));
        this.passengers.push(new Passenger('Rahul Mishra2'));
        this.passengers.push(new Passenger('Rahul Mishra3'));
        this.passengers.push(new Passenger('Rahul Mishra4'));
    }

    get passengers_count(){
        return this.passengers.length;
    }
}