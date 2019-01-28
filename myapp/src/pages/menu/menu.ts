import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { MenuServiceProvider } from "../../providers/menu-service/menu-service";

@IonicPage()
@Component({
  selector: "page-menu",
  templateUrl: "menu.html"
})
export class MenuPage implements OnInit {
  myCoffee: any[] = [];
  detailPage: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuList: MenuServiceProvider
  ) {}

  ngOnInit(): void {
    this.detailPage = "MenuDetailPage";
    this.grabMenu();
  }

  grabMenu() {
    this.menuList.getCafeDB().then(coffee => (this.myCoffee = coffee));
  }

  chooseCafe(id) {
    // console.log(id);
    this.navCtrl.push(this.detailPage, {
      id: id
    });
  }
}
