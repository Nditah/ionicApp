import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ViewController } from 'ionic-angular';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

import { AuthServiceProvider } from '../../providers/auth-service/auth-service';

/**
 * Generated class for the AddProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
	selector: 'page-add-product',
	templateUrl: 'add-product.html',
})
export class AddProductPage {

	private api_URI                : string  = "http://phpcrud.org/api";
    
	public READ                    : string = this.api_URI+"/product/read.php";
	public CREATE                  : string = this.api_URI+"/product/create.php";
	public UPDATE                  : string = this.api_URI+"/product/update.php";
	public DELETE                  : string = this.api_URI+"/product/delete.php";


	public form                    : FormGroup;
	
	public getCategory             : any;
	public isEdited                : boolean = false;
	public hideForm                : boolean = false;
	public pageTitle               : string;
	public btnSave               : string;

	
	public productData = {
  		"name": "",
  		"description": "",
  		"brand": "",
  		"location": "",
  		"code": "",
  		"price": "",
  		"category": "",
  		"id": null
  	};


	constructor( public navCtrl    : NavController,
               public http         : HttpClient,
               public navParams    : NavParams,
               public formBuilder  : FormBuilder,
               public toastCtrl    : ToastController,
               public authServiceProvider: AuthServiceProvider,
               public viewCtrl: ViewController ) 
	{
		// Create form builder validation rules
		this.form = formBuilder.group({
		 	"name"                  : ["", Validators.required],
		 	"description"           : ["", Validators.required],
		 	"brand"                 : ["", Validators.required],
		 	"location"              : ["", Validators.required],
		 	"code"                  : ["", Validators.required],
		 	"price"                 : ["", Validators.required],
		 	"category"              : ["", Validators.required]
		});
	}


	ionViewDidLoad() {
		console.log('ionViewDidLoad AddProductPage');
	}

   	ionViewWillEnter() : void {

		this.resetFields();
		this.getCat();
		
		if(this.navParams.get("record")) {
			this.isEdited      = true;
			this.selectEntry(this.navParams.get("record"));
			this.pageTitle     = 'Update product';
			this.btnSave       = 'Update';
		}
		else {
			this.isEdited      = false;
			this.pageTitle     = 'Add new product';
			this.btnSave       = 'Add';
		}

   	}

   	selectEntry(item : any) : void {

	   	this.productData = {
            "name": item.name,
            "description": item.description,
            "brand": item.brand,
            "location": item.location,
            "code": item.code,
            "price": item.price,
            "category": item.category_id,
            "id": item.id
        };
   	}

 	getCat() : void {
 		this.http.get("http://phpcrud.org/api/product/categories.php").subscribe((data : any) => {

 			this.getCategory = data.records;
 			//console.log(this.getCategory );
      	},
      	(error : any) => {
         	this.authServiceProvider.sendNotification('Something went wrong!');
      	});;
 	}

   	saveEntry() : void {
      	let name          : string    =  this.form.controls["name"].value,
          	description   : string    =  this.form.controls["description"].value,
          	brand         : string    =  this.form.controls["brand"].value,
          	location      : string    =  this.form.controls["location"].value,
          	code          : string    =  this.form.controls["code"].value,
          	price         : number    =  this.form.controls["price"].value,
          	category      : number    =  this.form.controls["category"].value;

      	if(this.isEdited) {
         	this.updateEntry(name, description, brand, location, code, price, category);
      	}	
      	else {
         	this.createEntry(name, description, brand, location, code, price, category);
      	}
   	}

   	createEntry(name : string, description : string, brand : string, location : string, code : string, price : number, category : number) : void {
 
        let params : any = { "name" : name, "description" : description, "brand" : brand, "location" : location, "code" : code, "price" : price, "category" : category };

      	this.http.post(this.CREATE, params ).subscribe((data : any) => {
       
         	this.hideForm   = true;
         	//console.log( params );
         	
         	this.authServiceProvider.sendNotification(`Successfully added ${name}!`);
         	
         	setTimeout(() => {
		      	this.navCtrl.push('ProductPage');
		    }, 2000);

      	},
      	(error : any) => {
         	this.authServiceProvider.sendNotification('Something went wrong!');
      	});
   	}


   	updateEntry(name : string, description : string, brand : string, location : string, code : string, price : number, category : number) : void {

		let params : any = { 
			"id" : this.productData.id,  
			"name" : name, 
			"description" : description, 
			"brand" : brand, 
			"location" : location, 
			"code" : code, 
			"price" : price, 
			"category" : category 
		};

      	this.http.post(this.UPDATE, params).subscribe(data => {

         	console.log(params)
         	this.hideForm  =  true;
         	this.authServiceProvider.sendNotification(`Successfully updated: ${name}!`);

         	setTimeout(() => {
		      	this.navCtrl.push('ProductPage');
		    }, 2000);
		    
      	},
      	(error : any) => {
         	this.authServiceProvider.sendNotification('Something went wrong!');
      	});
   	}

   	deleteEntry() : void {

       	let params : any = { 
       		"id" : this.productData.id 
       	};

      	this.http.post(this.DELETE, params).subscribe( data => {
         	
         	this.hideForm     = true;
         	this.authServiceProvider.sendNotification(`Successfully deleted product!`);

     	 	setTimeout(() => {
		      	this.navCtrl.push('ProductPage');
		    }, 2000);

      	},
      	(error : any) => {
         	this.authServiceProvider.sendNotification('Something went wrong!');
      	});
   	}

   	resetFields() : void {

      	this.productData = {
            "name": "",
            "description": "",
            "brand": "",
            "location": "",
            "code": "",
            "price": "",
            "category": "",
            "id": null
        };

   	}

   	closeModal() {
        this.viewCtrl.dismiss();
    }

}
