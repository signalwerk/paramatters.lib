import ContourStore from "./ContourStore";
import { Map } from "immutable";
import { uuid } from "../uuid";
import Child from "../Child";
import Point from "../Point/Point";

class Contour {
  constructor(...args) {
    this.store = new ContourStore();
    this.data = null;

    const id = uuid();
    this.store.register(id, newData => this.onChange(newData));

    this.store.reducer("CONTOUR_ADD", {
      id
    });

    this.points = new Child({
      store: this.store,
      parent: id,
      parentType: "contour",
      type: "points",
      create: attr => new Point(attr)
    });

    return this.init(args);

    // this.addPoint(newPoint);
    //
    // console.log("data", JSON.stringify(this.data));
    // newPoint.x(12);
    // console.log("data", JSON.stringify(this.data));
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
    this.data = newData;
  }

  set(obj) {
    this.store.reducer("CONTOUR_ATTR", {
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
