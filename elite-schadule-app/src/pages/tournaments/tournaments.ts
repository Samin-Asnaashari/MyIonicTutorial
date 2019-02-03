import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { TeamsPage } from "../teams/teams";
import { EliteApiProvider } from '../../providers/elite-api/elite-api';

@Component({
  selector: "page-tournaments",
  templateUrl: "tournaments.html"
})
export class TournamentsPage {
  public tournaments: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private elitApi: EliteApiProvider,
    public loadingController: LoadingController
  ) { }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting tournamnets...'
      // spinner: 'dots'
    });

    loader.present().then(() => {
      this.elitApi.getTournament().then(data => this.tournaments = data);
      loader.dismiss();
    });
  }

  itemTapped($event, tourney) {
    this.navCtrl.push(TeamsPage, tourney);
  }
}
