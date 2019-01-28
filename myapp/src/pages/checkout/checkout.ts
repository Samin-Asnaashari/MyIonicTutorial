import { Component, OnInit } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { CartServiceProvider } from "../../providers/cart-service/cart-service";

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
    public userService: UserServiceProvider,
    public cartService: CartServiceProvider
  ) { }

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
    this.userService.storageControl('get', `${user}-rewards`).then(returned => {
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
}
