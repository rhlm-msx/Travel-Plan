import { LightningElement } from 'lwc';

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
export default class View_travelrecords extends LightningElement {
    travels = []


    constructor(){
        super();
        this.travels = [new Trip(), new Trip('Pune'), new Trip('Gwalior')]
    }
    
}