import { LightningElement, wire, track, api } from 'lwc';
import getTravelData from '@salesforce/apex/TravelsDataController.getTravelData';
import getPassengers from '@salesforce/apex/TravelsDataController.getPassengers';
import deleteRecord from '@salesforce/apex/TravelsDataController.deleteRecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Card_travelview2 extends LightningElement {
    
    @track travelData;

    connectedCallback(){
        this.callTravel()
    }
    callTravel(){
        this.travelData = [];
        getTravelData().then((data) => {
           data.forEach((travel)=>{
                getPassengers({'travelId': travel.Id}).then(res => {
                    console.log(travel, res);
                    this.travelData.push({
                        travel: travel,
                        passengers: res
                    });
                })
           }) 
        })
    }

    handleDelete(event){
        deleteRecord({'travelId': event.target.value}).then((data) => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Success',
                message: 'Deleted record created: ',
                variant: 'success',
            }));
        }).catch((error) => {
            this.dispatchEvent(new ShowToastEvent({
                title: 'Failed',
                message: 'Deleted record created: ',
                variant: 'failed'
            }));
        })

    }

}