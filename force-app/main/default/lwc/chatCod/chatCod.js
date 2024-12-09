import { LightningElement, track } from 'lwc';
import getStuMsg from '@salesforce/apex/LoginController.getStudentMsg';
import getMsg from '@salesforce/apex/LoginController.getMessage';
import sndMsg from '@salesforce/apex/LoginController.sendCodMsg';
import Id from '@salesforce/user/Id';
import {refreshApex} from '@salesforce/apex';

export default class ChatCod extends LightningElement {

  data = [];
  data2 = [];
  @track msg;
  userId = Id;
  msgValue = "";


      connectedCallback(){
        this.getStudentMsg();
      }

      getStudentMsg(){
        getStuMsg({codId : this.userId})
        .then((result) =>{
          this.data = result;
          refreshApex(this.data);
        })
        .catch((error) =>{
          })

      }

      showMessage(event){
        const chId = event.currentTarget.dataset.id;
        this.cId = chId;
        this.getMessage();
      }

      getMessage(){
        getMsg({chatId :this.cId})
          .then((result) => {
            this.data2 = result;
            
        })
        .catch((error) => {
          });
      }

      sendMsg(){
        if(this.msg){
        sndMsg({Msg : this.msg, chatId: this.cId})
        .then((result) =>{
          this.getMessage();
          this.msgValue = "";
          })
        .catch((error) =>{
         })
      }
    }

      getMsgValue(event){
        this.msg = event.target.value;
        }



}