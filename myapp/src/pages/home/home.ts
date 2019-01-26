import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menuData = [
    { title: 'Our Menu', pic:'../../assets/imgs/Menu/MenuD.png', pushPage: 'MenuPage' },
    { title: 'Account', pic:'../../assets/imgs/Menu/Account.png', pushPage: 'AccountPage' },
    { title: 'About Us', pic:'../../assets/imgs/Menu/About.png', pushPage: 'AboutPage' },
    { title: 'Locations', pic:'../../assets/imgs/Menu/Locations.jpg', pushPage: 'LocationsPage' }
  ];

  constructor(public navCtrl: NavController) {

  }

}
