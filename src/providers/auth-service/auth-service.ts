import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';


//var passwordHash = require('./lib/password-hash');
// var passwordHash = require('password-hash');

// var randtoken = require('rand-token');

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

	public isLoggedIn : boolean = false;
	public loginForm  : boolean = false;


  	constructor( public http: HttpClient ,
  		public toastCtrl: ToastController ) 
  	{
    	console.log('Hello AuthServiceProvider Provider');
  	}

   	postData(credentials : any) {
    
    	let apiSignupURI = "http://phpcrud.org/api/user/create.php";

    	this.http.post(apiSignupURI, credentials ).subscribe((data : any) => {

         	console.log( credentials ); 
      	},
      	(error : any) => {
         	//this.sendNotification('Something went wrong!');
      	});
 	}

 	// authLogin( username : string, password: string ) : void {

 	// 	console.log( username, password );

 	// 	this.http.get('http://phpcrud.org/api/user/auth.php?username='+username).subscribe((data : any) => {

  //        	if(passwordHash.verify(password, data.password)) {

  //        		var token = randtoken.generate(16);

  //        		var feed = { "feed" : token, "user_id_fk" : data.user_id }
         		
  //        		this.http.post('http://phpcrud.org/api/feed/feed.php', feed ).subscribe((data : any) => {
  //        			console.log(data)
  //        		});

         		
  //        		this.sendNotification('User is now logged in.');
  //        		//this.navCtrl.push('ProductPage');
  //        	}
  //        	else {
  //        		this.sendNotification('Sorry login is incorrect');
  //        	}
  //     	},
  //     	(error : any) => {
  //        	this.sendNotification('Not available');
  //     	});
 	// }

 	sendNotification(message : string)  : void {
      	
      	let notification = this.toastCtrl.create({
     	 	message       : message,
          	duration      : 3000
      	});
      	
      	notification.present();
   	}
}
