import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { UserServiceProvider } from '../../providers/user-service/user-service';

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

  logPage: any;
  loggedIn: any;

  constructor(public navCtrl: NavController, private afAuth: AngularFireAuth, private userService: UserServiceProvider) {
    this.logPage = 'LoginPage';

    this.afAuth.auth.onAuthStateChanged(user => {
      if (user) {
        this.loggedIn = user.email;
      }
    })
  }

  signOff() {
    this.userService.logOut();
    this.loggedIn = '';
  }

}
