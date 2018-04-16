import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController  } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';


import { AddProductPage } from '../add-product/add-product';

/**
 * Generated class for the ProductPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-product',
  templateUrl: 'product.html',
})
export class ProductPage {
    
    public items        : Array<any> = [];
    
    searchQuery: string = '';
    

   	// Initialise module classes
   	constructor(public navCtrl    : NavController,
               public http        : HttpClient,
               public navParams   : NavParams,
               public modalCtrl: ModalController ) 
    { }


 	ionViewDidLoad() {
    	console.log('ionViewDidLoad ProductPage');
        this.loadProducts();
  	}

    loadProducts() {

        this.http.get('http://phpcrud.org/api/product/read.php').subscribe((data : any) => {
            //console.dir(data);
            this.items =  data.records;  
        },
        (error : any) => {
            console.dir(error);
        });
    }

    addEntry() : void {

        let prodModal = this.modalCtrl.create(AddProductPage);
        prodModal.present();

        //this.navCtrl.push('AddProductPage');
    }


    viewEntry(param : any) : void {

        let prodModal = this.modalCtrl.create(AddProductPage, param);
        prodModal.present();

    }

    landingPage() {
        this.navCtrl.push('LandingPage');
    }

    getItems(ev: any) {
        // set val to the value of the searchbar
        let val = ev.target.value;

        // if the value is an empty string don't filter the items
        if (val && val.trim() != '') {

            //console.log(this.items)

            this.items = this.items.filter((data) => {
                return (data.name.toLowerCase().indexOf(val.toLowerCase()) > -1);
            })
        }
        else {
            this.loadProducts();
        }

    }


}
