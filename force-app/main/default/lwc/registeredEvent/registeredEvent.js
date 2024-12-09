import { LightningElement,track } from 'lwc';
import fullname from '@salesforce/apex/LoginController.getFullName';
import getRegEvent from '@salesforce/apex/LoginController.getRegisteredEvent';
import getCmpEvent from '@salesforce/apex/LoginController.getCompletedEvent'

export default class RegisteredEvent extends LightningElement {
    @track un;
    @track fullName = ''; 
    @track uId;
    
    data = [];
    data2 = [];
    connectedCallback() {
        this.un = sessionStorage.getItem('usern');
        this.getFullName();

        setTimeout(() => {
            this.adjustHeaderPadding();
          }, 0);
    }


    getFullName(){
        console.log(this.un);
        fullname({ username: this.un })
                .then((result) => {
                    console.log(result);
                        this.fullName = result[0].Full_Name__c;
                        this.uId = result[0].Id;
                        this.getRegisteredEvent();
                        this.getCompletedEvents();
                    
                })
                .catch((error) => {
                });
        }

        getRegisteredEvent(){
            console.log(this.uId);
            getRegEvent({ uId : this.uId})
            .then((result) =>{
                this.data = result;
            })
            .catch((error) =>{
                
            })
        }


        getCompletedEvents(){
            getCmpEvent({ uId : this.uId})
            .then((result) =>{
                this.data2 = result;
            })
            .catch((error) =>{
                
            })
        }

        


          headerStyle = '';
        
          adjustHeaderPadding() {
            const tblContent = this.template.querySelector('.tbl-content');
            const scrollWidth = tblContent.offsetWidth - tblContent.clientWidth;
        
            this.headerStyle = `padding-right: ${scrollWidth}px;`;
          }
        
}