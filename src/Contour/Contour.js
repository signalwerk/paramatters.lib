import Store from "../Store";
import { uuid } from "../uuid";
import Child from "../child";
import log from "../log";
import Point from "../Point/Point";

import { resolve } from "./ContourUtil";

class Contour {
  constructor(...args) {
    this.store = new Store();
    this.data = null;

    const id = uuid();
    this.store.register(id, newData => this.onChange(newData));

    this.store.contours.reducer("CONTOUR_ADD", {
      id
    });

    this.points = new Child({
      parent: () => this,
      parentType: "contour",
      type: "points",
      getter: () => this.data.get("points"),
      create: attr => new Point(attr.merge({ forceId: true }))
    });

    return this.init(args);
  }

  init(args) {
    // init with new Point({x: 10, y: 20});
    if (args.length === 1) {
      this.set(args[0]);
      return this;
    }

    return this;
  }

  onChange(newData) {
    log.cyan(`contour - onChange - Store ${this.store.data.get("id")}`);
    log.white(log.json(newData, 6));
    this.data = resolve(newData, this.store);
  }

  reload() {
    const id = this.data.get("id");
    const newData = this.store.data.getIn(["contours", id]);
    this.data = resolve(newData, this.store);
  }

  set(obj) {
    this.store.contours.reducer("CONTOUR_ATTR", {
      id: this.data.get("id"),
      attr: obj
    });
  }

  getset(key, param) {
    if (param.length > 0) {
      this.set({ [key]: param[0] });
      return this;
    }
    return this.data.get(key);
  }

  // get/set methods
  closed(...args) {
    return this.getset("closed", args);
  }

  // points(...args) {
  //   return this.data.get("points").map(item => new Points(item))
  //   // return this.getset("points", args);
  // }

  // addPoint(point) {
  //   if (point) {
  //     this.data = this.data.updateIn(["points"], points => points.push(point.data));
  //   }
  // }

  setStore(args) {
    if (args) {
      this.store = args;
    }
    return this.store;
  }

  toString() {
    return JSON.stringify(this.data);
  }

  toJS() {
    return this.data.toJS();
  }

  // copy a point without the events
  clone() {
    return new Contour(this.data);
  }
}

export default Contour;
