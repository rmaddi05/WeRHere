import { LightningElement } from 'lwc';
import { NavigationMixin } from "lightning/navigation";

export default class NavBar extends NavigationMixin(LightningElement) {

    un;

    connectedCallback() {
        this.un = sessionStorage.getItem('usern');
        console.log('Retrieved username from sessionStorage:', this.un);
        this.uName = this.un;
    }

    navigateToHome() {
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
    
    navigateToRegisterEvent() {
        console.log('HERE');
        this[NavigationMixin.Navigate](
            {
                type: "standard__webPage",
                attributes: {
                        url: "https://d5g00000i2cdeea3-dev-ed.develop.my.site.com/werhere/s/studentregisterevent",
                },
            },
            true,
        );
    }
        navigateToRegisteredEvent(){
            this[NavigationMixin.Navigate](
                {
                    type: "standard__webPage",
                    attributes: {
                        url: "https://d5g00000i2cdeea3-dev-ed.develop.my.site.com/werhere/s/studentregisterdevent",
                    },
                },
                true,
            );
        }

        navigateToChat(){
            this[NavigationMixin.Navigate](
                {
                    type: "standard__webPage",
                    attributes: {
                        url: "https://d5g00000i2cdeea3-dev-ed.develop.my.site.com/werhere/s/chats",
                    },
                },
                true,
            );
        }

        navigateToMyProfile(){
            this[NavigationMixin.Navigate](
                {
                    type: "standard__webPage",
                    attributes: {
                        url: "https://d5g00000i2cdeea3-dev-ed.develop.my.site.com/werhere/s/profile",
                    },
                },
                true,
            );
        }

        navigateToAboutus(){

            this[NavigationMixin.Navigate](
                {
                    type: "standard__webPage",
                    attributes: {
                        url: "https://d5g00000i2cdeea3-dev-ed.develop.my.site.com/werhere/s/aboutus",
                    },
                },
                true,
            );

        }

        navigateToLogout(){

            this[NavigationMixin.Navigate](
                {
                    type: "standard__webPage",
                    attributes: {
                        url: "https://d5g00000i2cdeea3-dev-ed.develop.my.site.com/werhere/s",
                    },
                },
                true,
            );

        }

    
    
    
}