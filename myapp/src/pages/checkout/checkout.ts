import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { CartServiceProvider } from "../../providers/cart-service/cart-service";
import { HomePage } from '../../../../samionic/src/app/home/home.page';
import { PayPal, PayPalPayment, PayPalConfiguration } from '@ionic-native/paypal';

@IonicPage()
@Component({
  selector: "page-checkout",
  templateUrl: "checkout.html"
})
export class CheckoutPage implements OnInit {
  order: any[];
  orderTotal: number;
  customer: any;
  rewardsDisplay: boolean;
  discountUsed: boolean = false;
  rewardList: any[] = [];
  discount: any;
  discountAmount: number = 0;
  discountTotal: number = 0;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private userService: UserServiceProvider,
    public cartService: CartServiceProvider // private payPal: PayPal
  ) {}

  ngOnInit(): void {
    this.cartService
      .getCart()
      .then(theCart => (this.order = theCart))
      .then(cart => this.sumTotal(cart))
      .then(sum => (this.orderTotal = sum))
      .then(cash => this.userService.returnUser())
      .then(cust => this.loadReward(cust));
  }

  sumTotal(order) {
    return Promise.resolve(
      order.reduce((total: number, item: any) => total + item.price, 0)
    );
  }

  removeOne(itemId, itemPrice) {
    if (this.discountTotal != 0) {
      let tempTotal = this.discountTotal - itemPrice;
      if (tempTotal <= 0) {
        this.userService.displayAlert(
          "Unable to apply",
          "You cannot apply rewards that create a credit"
        );
        this.removeReward;
      } else {
        this.cartService.removeItem(itemId, itemPrice);
        this.sumTotal(this.order)
          .then(sum => (this.orderTotal = sum))
          .then(dis => (this.discountTotal = dis - this.discount.amount));
      }
    } else {
      this.cartService.removeItem(itemId, itemPrice);
      this.sumTotal(this.order).then(sum => (this.orderTotal = sum));
    }
  }

  addRewards() {
    this.rewardsDisplay = this.rewardsDisplay ? false : true;
  }

  loadReward(user) {
    this.userService.storageControl("get", `${user}-rewards`).then(returned => {
      this.customer = user;
      if (!returned) {
        let tempOj = { rewardId: "No rewards generated", amount: 0 };
        this.rewardList.push(tempOj);
        console.log(this.rewardList, "here1");
      } else {
        this.rewardList = returned;
        console.log(this.rewardList, "here2");
      }
    });
  }

  applyReward(reward) {
    let tempAmount = this.orderTotal - reward.amount;
    if (tempAmount <= 0) {
      this.userService.displayAlert(
        "Unable to apply",
        "You cannot apply rewards that create a credit"
      );
    } else {
      this.discount = reward;
      this.discountAmount = reward.amount;
      this.discountTotal = this.orderTotal - reward.amount;
      this.discountUsed = true;
    }
  }

  removeReward() {
    this.discountUsed = false;
    this.discount = "";
  }

  purchase() {
    if (this.discountUsed) {
      let tempId = this.discount.rewardId;
      let temp = this.rewardList.map(x => x.rewardId).indexOf(tempId);
      if (temp > -1) {
        this.rewardList.splice(temp, 1);
      }
      this.userService
        .storageControl("set", `${this.customer}-rewards`)
        .then(results => console.log("Saved: ", results));
      this.payCart(this.discountTotal);
      this.cartService.emptyCart();
      this.userService.displayAlert(
        "Thank you",
        `You order for ${this.discountTotal} has been paid`
      );
      this.navCtrl.push(HomePage);
    } else {
      this.payCart(this.orderTotal);
      this.cartService.emptyCart();
      this.userService.displayAlert(
        "Thank you",
        `You order for ${this.orderTotal} has been paid`
      );
      this.navCtrl.push(HomePage);
    }
  }

  payCart(amt) {
  //   this.payPal
  //     .init({
  //       PayPalEnvironmentProduction: "production key goes here",
  //       PayPalEnvironmentSandbox: "SandBox Key"
  //     })
  //     .then(
  //       () => {
  //         this.payPal
  //           .prepareToRender(
  //             "PayPalEnvironmentSandbox",
  //             new PayPalConfiguration({})
  //           )
  //           .then(
  //             () => {
  //               let payment = new PayPalPayment(
  //                 amt,
  //                 "USD",
  //                 "Description",
  //                 "sale"
  //               );
  //               this.payPal.renderSinglePaymentUI(payment).then(
  //                 res => {
  //                   console.log("Result from Paypal: ", res);
  //                 },
  //                 err => {
  //                   console.log("Error ", err);
  //                 }
  //               );
  //             },
  //             conf => {
  //               console.log("Configuration Error ", conf);
  //             }
  //           );
  //       },
  //       init => {
  //         console.log("Init Error ", init);
  //       }
  //     );
  }
}
