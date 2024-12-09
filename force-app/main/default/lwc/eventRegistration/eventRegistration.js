import { LightningElement,track,api } from 'lwc';
import fullname from '@salesforce/apex/LoginController.getFullName';
import getEvent from '@salesforce/apex/LoginController.getEvent';
import registerEvent from '@salesforce/apex/LoginController.registerEvent';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class EventRegistration extends LightningElement {
    
    @track un;
    @track fullName = ''; 


    @track searchKey;
    @track searchBar = true;
    @track isEvent = true;

    @api street = '14401 S Military Trl';
    @api city = 'Delray Beach';
    @api state = 'FL';
    @api postalCode = '33484';
    @api country = 'USA';

    @track events = [];
    @track error = '';


    connectedCallback() {
        this.un = sessionStorage.getItem('usern');
        console.log('Retrieved username from sessionStorage:', this.un);
        this.getFullName();
    }


    getFullName(){
        console.log(this.un);
        fullname({ username: this.un })
                .then((result) => {
                        this.fullName = result[0].Full_Name__c;
                       
                })
                .catch((error) => {
                    
                });
        }

        handleKeydown(event) {
            if (event.key === "Enter") {
                this.handleSearch(event);
            }
        }

        handleSearch(event) {
            event.preventDefault();
            const sK  = this.template.querySelector('input[type="text"]').value;
            if(sK){
                this.searchKey = sK;
            this.searchBar = false;
            this.getEventApex();
            }
    }

        getEventApex() {

            if (this.searchKey) {
                getEvent({ hobbies: this.searchKey })
                    .then(result => {
                        this.events = result;
                        if (this.events.length > 0) {
                            this.isEvent = true;
                            this.error = undefined;
                            
                        }
                        else {
                            this.isEvent = false;
                            }
                    })
                    .catch(error => {
                        this.error = error;
                        this.events = undefined;
                    })
            }
            else {
                this.searchBar = true;
            }
        }
    
        get googleMapsUrl() {
            return `https://www.google.com/maps/search/?api=1&query=${this.street},${this.city},${this.state},${this.postalCode},${this.country}`;
        }
    
        handleLocateMe() {
            window.open(this.googleMapsUrl, '_blank');
        }
    
        handlePrevious() {
            this.searchBar = true;
        }
    
        handleRegistration(event) {
            this.isShowModal = true;
            this.eventId = event.currentTarget.dataset.id;
            registerEvent({ eventId: this.eventId, userName: this.un })
                .then(result => {
                    if(result == 'Registered'){
                    this.showToastRegistration();
                    }
                    else{
                        this.showToastRegistrationError();
                    }
                })
                .catch(error => {
                    this.error = error;
                    this.events = undefined;
                })
        }
    
        showToastRegistration() {
            const event = new ShowToastEvent({
                title: 'Success!',
                message: 'Succesfully Registered',
                variant: 'success',
                
            });
            this.dispatchEvent(event);
        }

        showToastRegistrationError(){

            const event = new ShowToastEvent({
                title: 'Error!',
                message: 'Already Registered',
                variant: 'Error',
                
            });
            this.dispatchEvent(event);

        }


}