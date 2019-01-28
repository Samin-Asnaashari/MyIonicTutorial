import { Injectable } from "@angular/core";
import "rxjs/add/operator/map";
import Promise from "promise-polyfill";

@Injectable()
export class MenuServiceProvider {
  cafe: any[] = [
    {
      id: "cof",
      name: "Coffee",
      description: "The classic standard, our exclusive select blend",
      img: "assets/imgs/Products/Coffee.jpg",
      small: 1.5,
      medium: 2.5,
      large: 3.25
    },
    {
      id: "lat",
      name: "Latte",
      description: "The classic standard, our exclusive select blend",
      img: "assets/imgs/Products/Coffee.jpg",
      small: 1.5,
      medium: 2.5,
      large: 3.25
    },
    {
      id: "moc",
      name: "Mocha",
      description: "The classic standard, our exclusive select blend",
      img: "assets/imgs/Products/Coffee.jpg",
      small: 1.5,
      medium: 2.5,
      large: 3.25
    }
  ];

  constructor() {}

  getCafeDB() {
    return Promise.resolve(this.cafe);
  }

  getOne(search) {
    let temp = this.cafe.map(x => x.id).indexOf(search);
    let single = this.cafe[temp];
    return Promise.resolve(single);
  }
}
