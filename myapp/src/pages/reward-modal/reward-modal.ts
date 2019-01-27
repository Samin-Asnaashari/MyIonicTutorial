import { Component } from "@angular/core";
import {
  IonicPage,
  NavController,
  NavParams,
  ViewController
} from "ionic-angular";

@IonicPage()
@Component({
  selector: "page-reward-modal",
  templateUrl: "reward-modal.html"
})
export class RewardModalPage {
  displayParam: number;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController
  ) {
    this.displayParam = navParams.get("rewardParam");
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }
}
