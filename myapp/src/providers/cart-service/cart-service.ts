import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
// import Promise from "promise-polyfill";

@Injectable()
export class CartServiceProvider {
  theCart: any[] = [];

  constructor() {}

  getCart() {
    return Promise.resolve(this.theCart);
  }

  addItem(myItem) {
    this.theCart.push(myItem);
  }

  removeItem(id, price) {
    let tempId = `${id}-${price}`;
    let temp = this.theCart.map(x => x.orderId).indexOf(tempId);
    if (temp > -1) {
      this.theCart.splice(temp, 1);
    }
  }

  emptyCart() {
    this.theCart = [];
  }
}
