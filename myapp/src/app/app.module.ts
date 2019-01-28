import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { AngularFireModule } from "angularfire2";
import { AngularFireDatabaseModule } from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { IonicStorageModule } from '@ionic/storage';
// import { Firebase, FirebaseOriginal } from '@ionic-native/firebase';
// import { FCM, FCMOriginal } from '@ionic-native/fcm'; 

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { RewardModalPageModule } from '../pages/reward-modal/reward-modal.module';

import { UserServiceProvider } from '../providers/user-service/user-service';
import { RewardServiceProvider } from '../providers/reward-service/reward-service';
import { MenuServiceProvider } from '../providers/menu-service/menu-service';
import { CartServiceProvider } from '../providers/cart-service/cart-service';

export const firebaseConfig = {
  apiKey: "AIzaSyC8iwFL9cWlmpPB7J34RS-kOQe8siIUOmg",
  authDomain: "coffeedeer-a71f8.firebaseapp.com",
  databaseURL: "https://coffeedeer-a71f8.firebaseio.com",
  storgaeBucket: "coffeedeer-a71f8.appspot.com",
  messageSenderId: "611014045248"
}

@NgModule({
  declarations: [
    MyApp,
    HomePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    IonicStorageModule.forRoot(),
    RewardModalPageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    UserServiceProvider,
    RewardServiceProvider,
    MenuServiceProvider,
    CartServiceProvider,
    // FCM
  ]
})
export class AppModule {}
