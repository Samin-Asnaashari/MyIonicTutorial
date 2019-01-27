import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { HomePage } from "../home/home";

@IonicPage()
@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  regPage: any;
  login = {
    email: "",
    passWrd: ""
  };

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserServiceProvider
  ) {
    this.regPage = "RegisterPage";
  }

  signOn() {
    if (!this.login.email || !this.login.passWrd) {
      this.userService.displayAlert(
        "Error!",
        "You must enter email and password"
      );
    } else {
      this.userService
        .logOn(this.login.email, this.login.passWrd)
        .then(returned => {
          if (this.userService.success) {
            this.navCtrl.push(HomePage);
          } else {
            this.login.email = "";
            this.login.passWrd = "";
          }
        });
    }
  }

  // ionViewDidLoad() {
  //   console.log('ionViewDidLoad LoginPage');
  // }
}
