import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import Promise from "promise-polyfill";
import { Storage } from "@ionic/storage";
import { ModalController } from 'ionic-angular';
import { RewardModalPage } from '../../pages/reward-modal/reward-modal';

@Injectable()
export class RewardServiceProvider {
  constructor(private storage: Storage, private modalCtrl: ModalController) {}

  rewards: any[] = [];
  list: any[] = [0.5, 0.75, 1.0, 1.25, 1.5, 1.75, 2.0, 0.25, 0.5, 0.75];

  rewardsCheck(user, userData) {
    return new Promise((resolve, reject) => {
      userData.logins += 1;
      if (userData.logings == 2) {
        let firstReward = this.rewardsChance(user, userData.rewardCount);
        userData.rewardCount = firstReward;
        resolve(userData);
      } else if (userData.logins % 2 == 0) { // 10
        let newCount = this.rewardsChance(user, userData.rewardCount);
        userData.rewardCount = newCount;
        resolve(userData);
      } else {
        resolve(userData);
      }
    });
  }

  rewardsChance(user, count) {
    if (count == 0) {
      count++;
      this.generateReward(user, count);
      return count;
    } else {
      let chance = Math.floor(Math.random() * 100 + 1);
      if (chance > 50) {
        count++;
        this.generateReward(user, count);
        return count;
      } else {
        return count;
      }
    }
  }

  generateReward(user, count) {
    let dex = Math.floor(Math.random() * 10);
    let rewarded = this.list[dex];
    let rewardObj = {
      rewardId: `REW-${count}`,
      amount: rewarded
    };

    this.storage.get(`${user}-rewards`).then(returned => {
      if (!returned) {
        this.rewards.push(rewardObj);
        this.storage
          .set(`${user}-rewards`, this.rewards)
          // .then(res => console.log(user, `Awarded ${rewarded}`));
          .then(res => this.displayReward(rewarded));
      } else {
        this.rewards = returned;
        this.rewards.push(rewardObj);
        this.storage
          .set(`${user}-rewards`, this.rewards)
          // .then(res => console.log(user, `Awarded ${rewarded}`));
          .then(res => this.displayReward(rewarded));
      }
    });
  }

  displayReward(amount) {
    let theModal = this.modalCtrl.create(RewardModalPage, { 'rewardParam': amount});
    theModal.present();
  }
}
