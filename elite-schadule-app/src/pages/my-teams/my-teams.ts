import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, LoadingController } from "ionic-angular";
import { TournamentsPage } from "../tournaments/tournaments";
import { EliteApiProvider } from "../../providers/elite-api/elite-api";
import { TeamHomePage } from '../team-home/team-home';

// @IonicPage()
@Component({
  selector: "page-my-teams",
  templateUrl: "my-teams.html"
})
export class MyTeamsPage {
  public favorites: any[] = [
    {
      team: { id: 6182, name: "HC Elite 7th", coach: "Michelotti" },
      tournamnetId: "89e13aa2-ba6d-4f55-9cc2-61eba6172c63",
      tournamentName: "Sam"
    },
    {
      team: { id: 805, name: "HC Elite", coach: "Michelotti" },
      tournamnetId: "98c6857e-b0d1-4295-b89e-2d95a45437f2",
      tournamentName: "Omid"
    }
  ];

  constructor(
    public nav: NavController,
    public navParams: NavParams,
    private elitApi: EliteApiProvider,
    public loadingController: LoadingController
  ) { }

  goToTournaments() {
    this.nav.push(TournamentsPage);
    // this.navCtrl.pop();
  }

  favoritesTapped($event, favorite) {
    let loader = this.loadingController.create({
      content: 'Getting data...',
      dismissOnPageChange: true
    });
    loader.present();
    this.elitApi.getTournamentData(favorite.tournamnetId)
      .subscribe(t => this.nav.push(TeamHomePage, favorite.team));
  }
}
