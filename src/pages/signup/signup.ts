import { Component } from '@angular/core';
import { IonicPage, NavController, ViewController} from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';


import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

var passwordHash = require('password-hash'); 

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

    public form : FormGroup;
 	public responseData : any;
  	
    public userData = {
  		"username": "",
  		"password": "",
  		"name": "",
  		"email": ""
  	};

  	constructor(
  		public navCtrl: NavController,
        public http: HttpClient,
  		public authServiceProvider: AuthServiceProvider,
        public formBuilder : FormBuilder,
        public viewCtrl: ViewController ) 
  	{
        // Create form builder validation rules
        this.form = formBuilder.group({
            "name" : ["", Validators.required],
            "email" : ["", Validators.required],
            "username" : ["", Validators.required],
            "password" : ["", Validators.required]
        });
    }

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad SignupPage');
  	}

 	signup() : void {
 		
        this.http.get('http://phpcrud.org/api/user/read.php?username='+this.userData.username).subscribe((data : any) => {
  
            if(data.username_exist === false) {

                this.authServiceProvider.sendNotification(`Success`);
                this.userData.password = passwordHash.generate(this.userData.password);
                this.authServiceProvider.postData(this.userData);    
                this.authServiceProvider.sendNotification(`User successfully created.`);

                this.resetFields();
                this.navCtrl.push('LoginPage');
            }
            else {
                this.authServiceProvider.sendNotification(`Username already exist!`);
            }
        });
     	 
  	}


  	login() : void {
    	this.navCtrl.push('LoginPage');
  	}

    resetFields() : void {

        this.userData = {
            "username": "",
            "password": "",
            "name": "",
            "email": ""
        };
    }

    closeModal() {
        this.viewCtrl.dismiss();
    }
}
