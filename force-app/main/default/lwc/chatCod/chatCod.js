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

  // discussions = [
  //       {
  //         id: 1,
  //         photoStyle: "background-image: url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1');",
  //         name: "Megan Leib",
  //         message: "9 pm at the bar if possible 😳",
  //         timer: "12 sec",
  //         online: true
  //       },
  //       {
  //         id: 2,
  //         photoStyle: "background-image: url('https://i.pinimg.com/originals/a9/26/52/a926525d966c9479c18d3b4f8e64b434.jpg');",
  //         name: "Dave Corlew",
  //         message: "Let's meet for a coffee or something today ?",
  //         timer: "3 min",
  //         online: true
  //       }
  //       // Add more discussions as needed
  //     ];
    
  //     // Sample data for messages
  //     messages = [
  //       {
  //         id: 1,
  //         photoStyle: "background-image: url('https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1');",
  //         text: "Hi, how are you?",
  //         time: "14h58",
  //         online: true,
  //         class: "message"
  //       },
  //       {
  //         id: 2,
  //         text: "What are you doing tonight?",
  //         time: "14h59",
  //         class: "message text-only"
  //       }
  //       // Add more messages as needed
  //     ];

      connectedCallback(){
        this.getStudentMsg();
      }

      getStudentMsg(){
        getStuMsg({codId : this.userId})
        .then((result) =>{
          console.log(result);
          this.data = result;
          console.log(this.data);
          refreshApex(this.data);
        })
        .catch((error) =>{
          console.log(error);
        })

      }

      showMessage(event){
        console.log('CALLEDDD');
        const chId = event.currentTarget.dataset.id;
        console.log('Chat Id',chId);
        this.cId = chId;
        console.log(this.cId);  
        this.getMessage();
      }

      getMessage(){
        console.log('getMessage ch id', this.cId);
        getMsg({chatId :this.cId})
          .then((result) => {
            console.log(result); 
            this.data2 = result;
            console.log(this.data2);
            console.log(this.data2[1]);
           
        })
        .catch((error) => {
          console.log(error);
        });
      }

      sendMsg(){
        console.log('CALLED send msg');
        if(this.msg){
        console.log(this.msg);
        console.log(this.cId);
        sndMsg({Msg : this.msg, chatId: this.cId})
        .then((result) =>{
          console.log(result);
          console.log('HI');
          this.getMessage();
          this.msgValue = "";
          //this.msg = '';
          // this.data2 = result;
          // console.log(this.data2);
        })
        .catch((error) =>{
          console.log(error);
        })
      }
    }

      getMsgValue(event){
        this.msg = event.target.value;
        console.log('msg',this.msg);
      }



}