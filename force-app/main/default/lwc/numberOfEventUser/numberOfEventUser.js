import { LightningElement,api } from 'lwc';
import getUser from '@salesforce/apex/LoginController.getNumberOfUser';
import { NavigationMixin } from 'lightning/navigation';

export default class NumberOfEventUser extends NavigationMixin(LightningElement) {
    @api recordId;

    data = [];
    connectedCallback(){
        this.getNumberOfUser();
    }

    getNumberOfUser(){
        console.log(this.recordId);
        getUser({eId : this.recordId})
        .then((result) =>{
            console.log(result);
            this.data = result;
        })
        .catch((error) =>{
            console.log(error);
        })
    }

    navigateToRecord(event){
        const rId = event.currentTarget.dataset.id;
    
        this[NavigationMixin.Navigate]({
            type: 'standard__recordPage',
            attributes: {
                recordId: rId,
                actionName: 'view'
            }
        });
    }
    
}

