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
      console.log('Retrieved username from sessionStorage:', this.un);
      this.getFullName();
      this.searchCod();
    }

  getFullName(){
    console.log(this.un);
    fullname({ username: this.un })
            .then((result) => {
                console.log(result);
                this.uId = result[0].Id;
                console.log(this.uId);
            })
            .catch((error) => {
                console.log(error);
            });
    }

      showMessage(event){

        console.log('CALLEDDD');
        const cod = event.currentTarget.dataset.id;
        console.log('Cod Id',cod);
        this.cId = cod;
        console.log(this.cId);

        this.getChatId();
        // event.preventDefault();
        

      }

      getName(event){
        console.log('CALLEDDD');
        const name = event.currentTarget.dataset.id;
        console.log('Cod NAme',name);
        this.cName = name;
        console.log(this.cName);

      }

      getSearchValue(event){
        //event.preventDefault();
        this.codSword = event.target.value;
        console.log(this.codSword);
        console.log('SV');
      }

      searchCod(){
        console.log('CALLED COD');
        console.log(this.codSword);
        //getCod({cName : this.codSword})
        getCod()
        .then((result) =>{
          console.log(result);
          this.data2 = result;
          console.log(this.data2);
        })
        .catch((error) =>{
          console.log(error);
        })
      }

      getMsgValue(event){
        this.msg = event.target.value;
        console.log('msg',this.msg);
      }

      

      getChatId(){
        console.log('getC', this.cId);
        getChat({codId :this.cId, uId : this.uId })
        .then((result) =>{
          console.log(result);
          this.chat = result;
          console.log('chat id',this.chat[0].Id);
          this.chId = this.chat[0].Id;
          console.log(this.chId);
          console.log(typeof(this.chId));
          this.getMessage();
        })
        .catch((error) =>{
          console.log(error);
        })

        
      }

      handleKeyDown(event) {
  // Check if the key pressed is "Enter"
  if (event.key === 'Enter') {
    event.preventDefault(); // Prevent any default behavior
    this.sendMsg(); // Call the send message function
  }
}

scrollToBottom() {
    setTimeout(() => {
        const chatContainer = this.template.querySelector('.messages-chat');
        if (chatContainer) {
            chatContainer.scrollTop = chatContainer.scrollHeight;
        }
    }, 0.5); // Wait 100 milliseconds
}



      sendMsg(){
        console.log('CALLED send msg');
        if(this.msg){
        console.log(this.msg);
        console.log(this.chId);
        sndMsg({Msg : this.msg, chatId: this.chId})
        .then((result) =>{
          console.log(result);
          console.log('HI');
          this.getMessage();
          this.msg = '';
          this.showMessage();
          this.msgValue = "";
          this.scrollToBottom();
          // this.data2 = result;
          // console.log(this.data2);
        })
        .catch((error) =>{
          console.log(error);
        })
      }
      
      
    }


      getMessage(){
        console.log('getMessage ch id', this.chId);
        getMsg({chatId :this.chId})
          .then((result) => {
            console.log(result); 
            this.data = result;
            console.log(this.data);
            console.log(this.data[1]);
            refreshApex(this.data);
            this.scrollToBottom();
           
        })
        .catch((error) => {
          console.log(error);
        });

      

      }

}