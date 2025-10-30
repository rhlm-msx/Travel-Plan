import { LightningElement, wire } from 'lwc';
import getTravelData from '@salesforce/apex/TravelsDataController.getTravelData';
import getPassengers from '@salesforce/apex/TravelsDataController.getPassengers';
import deleteRecord from '@salesforce/apex/TravelsDataController.deleteRecord';

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
    constructor(source='Lucknow'){
        this.Id = '';
        this.source_city = source;
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

class Passenger{
    constructor(id, name, email, phone){
        this.Id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
    }
}

export default class View_travelrecords extends LightningElement {
    travels = []
    passengers = []


    @wire(getTravelData)
    fetchdata({data, error}){
        if(data){
            data.forEach(travel => {
                let trip = new Trip();
                trip.Id = travel.Id;
                trip.destination_city = travel.Name;

                this.travels.push(trip);
            })
        }else if(error){
            console.log(error);

        }
    }


    
}