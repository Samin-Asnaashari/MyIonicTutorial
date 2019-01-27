import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase/app";
import { AlertController } from "ionic-angular";
import { Storage } from "@ionic/storage";
import { AngularFireDatabase, AngularFireList } from "angularfire2/database"; // FirebaseListObservable
// Dexi

@Injectable()
export class UserServiceProvider {
  items: AngularFireList<any>;
  success: boolean;

  constructor(
    private afAuth: AngularFireAuth,
    public alectCtrl: AlertController,
    private storage: Storage,
    private fbDb: AngularFireDatabase
  ) {
    //public http: HttpClient
    // console.log('Hello UserServiceProvider Provider');
    this.items = fbDb.list("/users");
  }

  displayAlert(alertTitle, alertSub) {
    let theAlert = this.alectCtrl.create({
      title: alertTitle,
      subTitle: alertSub,
      buttons: ["OK"]
    });
    theAlert.present();
  }

  storageControl(action, key?, value?) {
    if (action == "set") {
      return this.storage.set(key, value);
    }
    if (action == "get") {
      return this.storage.get(key);
    }
    if (action == "delete") {
      if (!key) {
        this.displayAlert("Warning", "About to delete all user data");
        return this.storage.clear();
      } else {
        this.displayAlert(key, "Deleting this users data");
        return this.storage.remove(key);
      }
    }
  }

  saveNewUser(user) {
    let userObj = {
      creation: new Date().toDateString(),
      logins: 1,
      rewardCount: 0,
      lastLogin: new Date().toLocaleString(),
      id: ""
    };
    this.items
      .push({
        username: user,
        creation: userObj.creation,
        logins: userObj.logins,
        rewardCount: userObj.rewardCount,
        lastLogin: userObj.lastLogin
      })
      .then(res => {
        userObj.id = res.key;
        return this.storageControl("set", user, userObj);
      });

    return this.storageControl("get", user);
  }

  updateUser(theUser, theUserData) {
    let newData = {
      creation: theUserData.creation,
      logins: theUserData.logins + 1,
      rewardCount: theUserData.rewardCount,
      lastLogin: new Date().toLocaleString(),
      id: theUserData.id
    };
    this.items.update(newData.id, {
      logins: newData.logins,
      rewardCount: newData.rewardCount,
      lastLogin: newData.lastLogin
    });
    return this.storageControl("set", theUser, newData);
  }

  logOn(user, password) {
    return this.afAuth.auth
      .signInWithEmailAndPassword(user, password)
      .then(result => {
        this.storageControl("get", user).then(returned => {
          if (!returned) {
            this.saveNewUser(user).then(res =>
              this.displayAlert(user, "New account saved for this user")
            );
          } else {
            this.updateUser(user, returned).then(updated =>
              console.log(user, updated)
            );
          }
        });
        this.success = true;
        return result;
      })
      .catch(err => {
        this.success = false;
        this.displayAlert("Error logging in", err);
        return err;
      });
  }

  logOut() {
    //this.storageControl('delete');
    this.afAuth.auth
      .signOut()
      .then(loggedOut =>
        this.displayAlert("Logged out", "Come back and visit soon")
      )
      .catch(err => this.displayAlert("Error logging out", err));
  }
}
