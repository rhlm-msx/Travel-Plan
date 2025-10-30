import { LightningElement, api, wire, track } from 'lwc';
import getPassengers from '@salesforce/apex/TravelsDataController.getPassengers';

const Status = {
    UPCOMMING: 'Upcomming',
    COMPLETED: 'Completed'
};

const MOT = {
    TRAIN: 'Train',
    BUS: 'Bus',
    FLIGHT: 'Flight',
    Others: 'Others'
}

const MOT_ICONS = {
    TRAIN: 'custom:custom36',
    BUS: 'utility:truck',
    FLIGHT: 'custom:custom20'
}

class Trip{
    constructor(){
        this.source_city = 'Lucknow'
        this.destination_city = 'Pune'
        this.departure_date = new Date()
        this.arrival_date = new Date()
        this.arrival_date.setDate(31);
        this.mode = MOT.FLIGHT
    }
    get icon(){
        switch(this.mode){
            case MOT.BUS: return MOT_ICONS.BUS;
            break;
            case MOT.TRAIN: return MOT_ICONS.TRAIN;
            break;
            case MOT.FLIGHT: return MOT_ICONS.FLIGHT;
        }
        return 'custom:custom10';
    }
    get status(){
        if(this.departure_date > new Date()){
            return Status.UPCOMMING
        }else{
            return Status.COMPLETED
        }
    }
    get duration(){
        let date = this.arrival_date - this.departure_date;
        let day = Math.floor(date / (1000 * 60 * 60 * 24));
        let hr = Math.floor(date / (1000 * 60 * 60));
        let min = Math.floor(date / (1000 * 60));

        let fmt = (day > 0) ? `${day}D `: '' + (hr > 0) ? `${hr}hr `: '' + (min > 0) ? `${min}min `: '';
        
        return fmt;
    }
}


class Passenger {
    constructor(id, name, email, phone) {
        this.Id = id;
        this.Name = name;
        this.Email = email;
        this.Mobile = phone;
    }
}

export default class Card_travelview3 extends LightningElement {
    @api trip = new Trip();
    passengers = []
    constructor(){
        super();
        console.log('Trip', this.trip);
    }
    renderCallback(){
        getPassengers({travelId: this.trip.Id}).then(res => {
            res.forEach(pass => {
                pass = pass.Passenger__r;
                let passenger = new Passenger(pass.Id, pass.Name, pass.Email__c, pass.Mobile__c);
                this.passengers.push(passenger);
                console.log('pass', this.passengers);
            })
        }).catch(error=>{
            console.log('error', error);
        })
    }
}