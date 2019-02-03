import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { TeamHomePage } from "../team-home/team-home";
import { EliteApiProvider } from "../../providers/elite-api/elite-api";

@Component({
  selector: "page-teams",
  templateUrl: "teams.html"
})
export class TeamsPage {
  // public teams = [
  //   { id: 1, name: "HTC Elite" },
  //   { id: 1, name: "Sam Elite" },
  //   { id: 1, name: "Omid Elite" }
  // ]
  public teams = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private elitApi: EliteApiProvider,
    public loadingController: LoadingController
  ) { }

  ionViewDidLoad() {
    let loader = this.loadingController.create({
      content: 'Getting teams...',
      spinner: 'dots'
    });

    loader.present().then(() => {
      let selectedTourney = this.navParams.data;
      this.elitApi
        .getTournamentData(selectedTourney.id)
        .subscribe(data => (this.teams = data.teams));
      loader.dismiss();
    });
  }

  ionViewWillEnter() { }

  ionViewDidEnter() { }

  ionViewWillLeave() { }

  ionViewDidLeave() { }

  ionViewWillUnload() { }

  ionViewCanEnter() { }

  ionViewCanLeave() { }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }
}
