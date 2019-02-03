import { Component } from "@angular/core";
import { NavController, NavParams, LoadingController } from "ionic-angular";
import { TeamHomePage } from "../team-home/team-home";
import { EliteApiProvider } from "../../providers/elite-api/elite-api";

import * as _ from "lodash";

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
  private allTeams: any;
  private allTeamDivisions: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private elitApi: EliteApiProvider,
    public loadingController: LoadingController
  ) { }

  ionViewDidLoad() {
    let selectedTourney = this.navParams.data;
    let loader = this.loadingController.create({
      content: 'Getting teams...',
      spinner: 'dots'
    });
    loader.present().then(() => {
      this.elitApi.getTournamentData(selectedTourney.id).subscribe(data => {
        this.allTeams = data.teams;
        this.allTeamDivisions =
          _.chain(data.teams)
            .groupBy('division')
            .toPairs()
            .map(item => _.zipObject(['divisionName', 'divisionTeams'], item))
            .value();
        this.teams = this.allTeamDivisions; //data.teams
        console.log('divisions teams', this.teams);
        loader.dismiss();
      });
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
