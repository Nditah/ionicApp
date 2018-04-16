import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

var passwordHash = require('password-hash');

// var randtoken = require('rand-token');


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

	public userData = {
  		"username": "",
  		"password": ""
  	};

    data : any;

  	constructor(public params: NavParams,
                public navCtrl: NavController,
                public authServiceProvider: AuthServiceProvider,
                public http : HttpClient,
                public viewCtrl: ViewController ) 
  	{}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad LoginPage');
  	}

  	login() : void {

  		if( this.userData.username == "" || this.userData.password == "") {
  			this.authServiceProvider.sendNotification(`Please fill up all the fields.`);
  		}
  		else {

            this.http.get('http://phpcrud.org/api/user/auth.php?username='+this.userData.username).subscribe((res : any) => {

                //console.log(data.password);

                if(passwordHash.verify(this.userData.password, res.password)) {

                    // var token = randtoken.generate(16);

                    // var feed = { "feed" : token, "user_id_fk" : data.user_id }
                    
                    // this.http.post('http://phpcrud.org/api/feed/create.php', feed ).subscribe((data : any) => {
                    //     console.log(data)
                    // });

                    this.http.get('http://phpcrud.org/api/user/read.php?username='+this.userData.username)
                    .subscribe((data : any) => {
                        this.authServiceProvider.sendNotification('User is now logged in.');
                        this.viewCtrl.dismiss(data);
                    });

                }
                else {
                    this.authServiceProvider.sendNotification('Sorry login is incorrect');
                }
            },
            (error : any) => {
                this.authServiceProvider.sendNotification('Not available');
            });

  			//this.authServiceProvider.authLogin( this.userData.username, this.userData.password );

  		}
  	}

    closeModal() {
        this.viewCtrl.dismiss(false);
    }

}
