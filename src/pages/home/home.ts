import { Component } from '@angular/core';
import { NavController, ModalController, AlertController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

import { LoginPage } from '../login/login';
import { SignupPage } from '../signup/signup';


import { GooglePlus } from '@ionic-native/google-plus';



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

    isLoggedIn                  : boolean = false;

    displayName                 : any;
    email                       : any;
    familyName                  : any;
    givenName                   : any;
    userId                      : any;
    imageUrl                    : any;

   	constructor(public navCtrl: NavController,
               	public http   : HttpClient,
               	public authServiceProvider: AuthServiceProvider,
                public modalCtrl: ModalController,
                private googlePlus: GooglePlus,
                public alertCtrl: AlertController ) 
   	{}

   	ionViewWillEnter() : void {

        // this.googlePlus.trySilentLogin({})
        // .then(res => {

        //      this.googlePlus.login({})
        //     .then(res => {
        //         console.log(res);
        //         this.displayName = res.displayName;
        //         this.email = res.email;
        //         this.familyName = res.familyName;
        //         this.givenName = res.givenName;
        //         this.userId = res.userId;
        //         this.imageUrl = res.imageUrl;
        //         this.isLoggedIn = true;
        //     })
        //     .catch(err => {
        //         this.authServiceProvider.sendNotification(err + `Error`)
        //         //console.error(err)
        //     });


        // })
        // .catch(err => 
        //     console.error(err)
        // );

   	}

   	login() : void {

        let loginModal = this.modalCtrl.create(LoginPage);
        loginModal.present();

        loginModal.onDidDismiss(data => {

            if (data) {
                console.log(data);

                this.displayName = data.name;
                this.email = data.email;
                this.familyName = data.name;
                this.givenName = data.name;
                this.userId = data.user_id;
                this.imageUrl = null;

                this.isLoggedIn = true;
            }
            
        });

   	}


    logout() {

        //Logout Normal 

        this.isLoggedIn = false;
            
        //Logout Google
        this.googlePlus.logout()
        .then(res => {
            console.log(res);
            this.displayName = "";
            this.email = "";
            this.familyName = "";
            this.givenName = "";
            this.userId = "";
            this.imageUrl = "";

            this.isLoggedIn = false;
        })
        .catch(err => 
            console.error(err)
        );
    }


   	signup() : void {

        let signupModal = this.modalCtrl.create(SignupPage);
        signupModal.present();

   		//this.navCtrl.push('SignupPage');
   	}

    // temporary to view landing page
    landing() : void {
        this.navCtrl.push('LandingPage');
    }




    loginGoogle() {

        this.googlePlus.login({})
        .then(res => {
            console.log(res);
            this.displayName = res.displayName;
            this.email = res.email;
            this.familyName = res.familyName;
            this.givenName = res.givenName;
            this.userId = res.userId;
            this.imageUrl = res.imageUrl;
            this.isLoggedIn = true;
        })
        .catch(err => {
            this.authServiceProvider.sendNotification(err + `Error`)
            //console.error(err)
        });
    }

 

    checkGoogle() {

        this.googlePlus.getSigningCertificateFingerprint()
        .then(res =>
            this.authServiceProvider.sendNotification(res + `Success`)
        )
        .catch(err =>
            this.authServiceProvider.sendNotification(err + `Error`)
        );
        
    }


    disconnect() {

        this.googlePlus.disconnect()
        .then(res => {
            console.log(res)
             
        })
        .catch(err => {
            console.log(err)
        });
    }


 
} 
