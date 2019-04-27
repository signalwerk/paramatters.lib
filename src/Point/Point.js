// import PointStore from "./PointStore";
import Store from "../Store";
import { Map } from "immutable";
import { uuid } from "../uuid";
import { isNumber } from "../util";

class Point {
  constructor(...args) {
    this.store = Store;
    this.data = null;

    const id = uuid();
    this.store.points.register(id, newData => this.onChange(newData));

    this.store.points.reducer("POINT_ADD", {
      id
    });

    return this.init(args);
  }

  init(args) {
    // init with new Point({x: 10, y: 20});
    if (args.length === 1) {
      this.set(args[0]);
      return this;
    }

    // init with x/y => new Point(x, y);
    if (args.length === 2 && isNumber(args[0]) && isNumber(args[1])) {
      this.set({ x: args[0], y: args[1] });
      return this;
    }

    return this;
  }

  onChange(newData) {
    this.data = newData;
  }

  set(obj) {
    this.store.points.reducer("POINT_ATTR", {
      id: this.data.get("id"),
      attr: obj,
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
  type(...args) {
    return this.getset("type", args);
  }

  x(...args) {
    return this.getset("x", args);
  }

  y(...args) {
    return this.getset("y", args);
  }

  id(...args) {
    if (args.length > 0) {
      throw new Error("point.id() can only be called not set.");
    }
    return this.data.get("id");
  }

  // move the point by xy
  move(x, y) {
    this.store.points.reducer("POINT_MOVE", {
      id: this.data.get("id"),
      x,
      y
    });

    return this;
  }

  // scale the point by factor
  scale(...args) {
    const x = args[0];
    const y = args[1] || args[0];

    this.store.points.reducer("POINT_SCALE", {
      id: this.data.get("id"),
      x,
      y
    });

    return this;
  }

  toString() {
    return JSON.stringify(this.data);
  }

  toJS() {
    return this.data.toJS();
  }

  // copy a point without the events
  clone() {
    return new Point(this.data);
  }
}

export default Point;
