import { List, Map } from "immutable";
import PointStore from "./PointStore";
import { uuid } from "./uuid";
import { isNumber } from "./util";

class Point {
  constructor() {
    this.store = new PointStore();
    this.data = Map({
      id: uuid()
    })
    // this.data.get("id") = uuid();

    this.store.register(this.data.get("id"), newData => this.onChange(newData));

    this.store.reducer("POINT_ADD", {
      id: this.data.get("id")
    });

    this.init(arguments);
  }

  init(args) {

    if (args.length === 1) {
      this.set(args[0]);
      return this;
    }

    // init with x/y => new fontcat.point(x, y);
    if (args.length === 2 && isNumber(args[0]) && isNumber(args[1])) {
      this.set({ x: args[0], y: args[1] });
      return this;
    }
  }

  onChange(newData) {
    this.data = newData;
  }

  set(obj) {
    this.store.reducer("POINT_ATTR", {
      ...obj,
      id: this.data.get("id")
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
  type() {
    return this.getset("type", arguments);
  }
  x() {
    return this.getset("x", arguments);
  }
  y() {
    return this.getset("y", arguments);
  }
  id() {
    return this.getset("id", arguments);
  }

  // move the point by xy
  move(x, y) {
    this.store.reducer("POINT_MOVE", {
      id: this.data.get("id"),
      x,
      y
    });

    return this;
  }

  // scale the point by factor
  scale(scaleFactor) {
    let x = arguments[0];
    let y = arguments[1] || arguments[0];

    this.store.reducer("POINT_SCALE", {
      id: this.data.get("id"),
      x,
      y
    });

    return this;
  }
}

export default Point;
