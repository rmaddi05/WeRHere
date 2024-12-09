import { LightningElement,track,wire } from 'lwc';
import getMsg from '@salesforce/apex/LoginController.getMessage';
import getCod from '@salesforce/apex/LoginController.getCordinator';
import getChat from '@salesforce/apex/LoginController.getChatId';
import sndMsg from '@salesforce/apex/LoginController.sendMsg';
import fullname from '@salesforce/apex/LoginController.getFullName';
import {refreshApex} from '@salesforce/apex';

export default class Chat extends LightningElement {
    
    data = [];
    data2 = [];
    chat = [];

    msgValue = "";
    @track codSword = '';
    @track msg = '';
    @track cId = '';
    @track cName = '';
    @track uId = '';
    @track chId = '';
    @track un;
    
  

    connectedCallback() {
      this.un = sessionStorage.getItem('usern');
      this.getFullName();
      this.searchCod();
    }

  getFullName(){
    fullname({ username: this.un })
            .then((result) => {
                this.uId = result[0].Id;
            })
            .catch((error) => {
            });
    }

      showMessage(event){

        const cod = event.currentTarget.dataset.id;
        this.cId = cod;
        
        this.getChatId();
        

      }

      getName(event){
        const name = event.currentTarget.dataset.id;
        this.cName = name;
      }

      getSearchValue(event){
        this.codSword = event.target.value;
      }

      searchCod(){
        getCod()
        .then((result) =>{
          this.data2 = result;
        })
        .catch((error) =>{
        })
      }

      getMsgValue(event){
        this.msg = event.target.value;
      }

      

      getChatId(){
        getChat({codId :this.cId, uId : this.uId })
        .then((result) =>{
          this.chat = result;
          this.chId = this.chat[0].Id;
          this.getMessage();
        })
        .catch((error) =>{
        })

        
      }

      handleKeyDown(event) {
  if (event.key === 'Enter') {
    event.preventDefault(); 
    this.sendMsg(); 
  }
}

scrollToBottom() {
    setTimeout(() => {
        const chatContainer = this.template.querySelector('.messages-chat');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, 0.5);
}



      sendMsg(){
        if(this.msg){
        sndMsg({Msg : this.msg, chatId: this.chId})
        .then((result) =>{
          this.getMessage();
          this.msg = '';
          this.showMessage();
          this.msgValue = "";
          this.scrollToBottom();
        })
        .catch((error) =>{
        })
      }
      
      
    }


      getMessage(){
        getMsg({chatId :this.chId})
          .then((result) => {
            this.data = result;
            refreshApex(this.data);
            this.scrollToBottom();
           
        })
        .catch((error) => {
        });

      

      }

}