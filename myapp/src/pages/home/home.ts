import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  menuData = [
    { title: 'About Us', pic:'../../assets/imgs/Menu/About.png', pushPage: 'AboutPage' },
    { title: 'Our Menu', pic:'../../assets/imgs/Menu/Menu.jpg', pushPage: 'MenuPage' },
    { title: 'Account', pic:'../../assets/imgs/Menu/Account.png', pushPage: 'AccountPage' },
    { title: 'Locations', pic:'../../assets/imgs/Menu/Locations.png', pushPage: 'LocationsPage' }
  ];

  logPage: any

  constructor(public navCtrl: NavController) {
    this.logPage = 'LoginPage';
  }

}
