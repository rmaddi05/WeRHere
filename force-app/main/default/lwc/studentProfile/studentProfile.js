import { LightningElement,track } from 'lwc';
import fullname from '@salesforce/apex/LoginController.getFullName';
import totalNumHour from '@salesforce/apex/LoginController.getNumberOfHours';
import updateData from '@salesforce/apex/LoginController.updateStudentDetails';
import ST_1 from "@salesforce/resourceUrl/st1";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

export default class StudentProfile extends LightningElement {
    ST1=ST_1;
    @track un;
    @track uId;
    @track fullName = '';
    @track bdate = '';
    @track email = '';
    @track age = '';
    @track phone = '';
    @track residence = '';
    @track add = '';
    @track abtU = '';
    @track totalHours;
    @track totalEvents;
    @track totalAwards;
    studentData = [];

    iseditform = false

    connectedCallback() {
        this.un = sessionStorage.getItem('usern');
        this.getFullName();
    }

    getFullName(){
        fullname({ username: this.un })
                .then((result) => {
                    this.fullName = result[0].Full_Name__c;
                        this.bdate = result[0].Date_of_Birth__c;
                        this.email = result[0].Email__c;
                        this.age = result[0].Age__c;
                        this.phone = result[0].Phone__c;
                        this.residence = result[0].Residence__c;
                        this.add = result[0].Address__c;
                        this.abtU = result[0].About_you__c;
                        console.log(this.fullName);
                        this.uId = result[0].Id;
                        this.getTotalNumberOfHours();
                       
                })
                .catch((error) => {
                });
        }
    
    saveData(){
        const UabtU = this.template.querySelector('input[type="textAb"]').value;
        const Uemail = this.template.querySelector('input[type="email"]').value;
        const Uadd = this.template.querySelector('input[type="textAd"]').value;
        const Urs = this.template.querySelector('input[type="textRs"]').value;
        const Uph = this.template.querySelector('input[type="textPh"]').value;
        const Ubdate = this.template.querySelector('input[type="date"]').value;

        
        updateData({username : this.un, abtU: UabtU, add :Uadd, email : Uemail, rsdnce : Urs, ph : Uph, dob : Ubdate})
        .then((result) => {
            console.log(result);
              console.log(result);
                  this.fullName = result[0].Full_Name__c;
                    this.bdate = result[0].Date_of_Birth__c;
                        this.email = result[0].Email__c;
                        this.age = result[0].Age__c;
                        this.phone = result[0].Phone__c;
                        this.residence = result[0].Residence__c;
                        this.add = result[0].Address__c;
                        this.abtU = result[0].About_you__c;
                  this.showToastUpdate();
                  
          })
          .catch((error) => {
          });

    }

    showToastUpdate(){
        const event = new ShowToastEvent({
          title: 'Success!',
          message: 'Data Update Successfully',
          variant: 'success',
      });
      this.dispatchEvent(event);
      }

    edit_button(){
        this.iseditform = !this.iseditform
    }

    formatPhoneNumber(event) {
        let input = event.target;
        let numbers = input.value.replace(/\D/g, '');
        if (numbers.length > 3 && numbers.length <= 6) {
            numbers = numbers.replace(/(\d{3})(\d{1,3})/, '$1-$2');
        } else if (numbers.length > 6) {
            numbers = numbers.replace(/(\d{3})(\d{3})(\d{1,4})/, '$1-$2-$3');
        }
        input.value = numbers;
    }

    getTotalNumberOfHours(){
        totalNumHour({uId : this.uId})
        .then((result) =>{
            this.studentData = result;
            this.totalHours = this.studentData[0];
            this.totalEvents = this.studentData[1];
            this.totalAwards = this.studentData[2]; 

        })
        .catch((error) =>{
        })
    }
}