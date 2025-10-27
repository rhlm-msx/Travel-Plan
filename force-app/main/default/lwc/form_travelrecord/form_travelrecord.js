import { LightningElement } from 'lwc';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class Form_travelrecord extends LightningElement {
  handleSuccess(event) {
    this.dispatchEvent(
      new ShowToastEvent({
        title: 'Success',
        message: 'Travel record created: ' + event.detail.id,
        variant: 'success',
      })
    );
  }
}