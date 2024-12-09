import { LightningElement,track } from 'lwc';
import ST_1 from "@salesforce/resourceUrl/bgImage";
import login from '@salesforce/apex/LoginController.loginController';
import register from '@salesforce/apex/LoginController.RegistrationController';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from "lightning/navigation";

export default class StudentLoginAndRegistraionForm extends NavigationMixin(LightningElement) {

@track isFlipped = false;
@track username = '';
@track password = '';
@track shareuName = '';
  ST1=ST_1

  get isLoginFormVisible() {
    return !this.isFlipped;
  }

  get isSignupFormVisible() {
    return this.isFlipped;
  }

  toggleFlip() {
    this.isFlipped = !this.isFlipped;
  }

  handleLogin(event) {
    event.preventDefault();
    const username = this.template.querySelector('input[type="text"]').value;
    const password = this.template.querySelector('input[type="password"]').value;

        if (username && password) {
            
            login({ username: username, password: password })
                .then((result) => {
                    if (result >= 1) {
                        this.uid = result;
                        this.shareuName = username;
                        this.showToastLogin();
                        this.sendUserName();
                        this.handleTransfer();

                    }
                    else {
                        this.showToastLoginError();
                    }
                })
                .catch((error) => {
                    });
            this.username = '';
            this.password = '';
        } else {
            console.error('Please fill in all fields');
        }
  }

  showToastLogin() {
    const event = new ShowToastEvent({
        title: 'Success!',
        message: 'Succesfully Login',
        variant: 'success',
    });
    this.dispatchEvent(event);
}

  showToastRegister(){
    const event = new ShowToastEvent({
      title: 'Success!',
      message: 'Succesfully Login',
      variant: 'success',
  });
  this.dispatchEvent(event);
  }

showToastLoginError(){
  const event = new ShowToastEvent({
  variant: 'error',
  title: 'Error',
  message: 'Incorrect Username or Password',
  });
  this.dispatchEvent(event);
}

sendUserName() {
  const uname = this.shareuName;
  sessionStorage.setItem('usern', uname);
}

handleTransfer() {
  this[NavigationMixin.Navigate](
      {
          type: "standard__webPage",
          attributes: {
              url: "https://d5g00000i2cdeea3-dev-ed.develop.my.site.com/werhere/s/studenthome",
          },
      },
      true,
  );
}


  handleSignup(event) {
    event.preventDefault();
    
    const RFullName = this.template.querySelector('input[type="text"]').value;
    const REmail = this.template.querySelector('input[type="email"]').value;
    const RUsername = this.template.querySelector('input[type="text1"]').value;
    const RPassword = this.template.querySelector('input[type="password"]').value;


    if (RFullName && REmail && RUsername && RPassword) {
      register({ FullName: RFullName, Email: REmail, username: RUsername, password: RPassword })
          .then((result) => {
            console.log(result);
              if (result != 'Not Inserted') {
                  this.showToastRegister();
                  this.toggleForm();

              }
              // else {
              //     this.showToastLoginError();
              // }
          })
          .catch((error) => {
              
          });
      this.RFullName = '';
      this.REmail = '';
      this.RUsername = '';
      this.RPassword = '';
  } else {
      console.error('Please fill in all fields');
  }
}

  showToastRegister() {
    const event = new ShowToastEvent({
      title: 'Success!',
      message: 'Succesfully Registed You can login now',
      variant: 'success',
  });
  this.dispatchEvent(event);
  }


  toggleForm() {
    this.isFlipped = !this.isFlipped;
  }
}