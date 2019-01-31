import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { TeamHomePage } from '../team-home/team-home';

@Component({
  selector: 'page-teams',
  templateUrl: 'teams.html',
})
export class TeamsPage {

  public teams = [
    { id: 1, name: "HTC Elite" },
    { id: 1, name: "Sam Elite" },
    { id: 1, name: "Omid Elite" }
  ]

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  itemTapped($event, team) {
    this.navCtrl.push(TeamHomePage, team);
  }

}
