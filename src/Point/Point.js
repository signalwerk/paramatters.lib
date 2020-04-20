// import PointStore from "./PointStore";
import { Map } from "immutable";
import Store from "../Store";
import { uuid } from "../uuid";
import log from "../log";
import { isNumber } from "../util";

class Point {
  constructor(...args) {
    this.store = new Store();
    this.data = null;
    this.events = [];

    let id = null;
    let argNew = null;

    // init with x/y => new Point(x, y);
    if (args.length === 2 && isNumber(args[0]) && isNumber(args[1])) {
      id = uuid();

      argNew = Map({
        id,
        x: args[0],
        y: args[1]
      });
    }

    if (args.length <= 1) {
      argNew = Map(args[0]);
      if (argNew.get("forceId") === true) {
        id = argNew.get("id");
      } else {
        id = uuid();
      }
    }

    this.init(argNew.merge({ id }));
    this.id = id;
    this.update();

    return this;
  }

  register(cb) {
    this.events.push(cb);
  }

  emit(...args) {
    this.events.map(item => item.apply(this, args));
  }

  init(args) {
    this.store.points.reducer("POINT_ADD", args);
  }

  update() {
    log.action(`point - update - Store ${this.store.data.get("id")}`);
    this.data = this.store.points.get(this.id);
    log.data(log.json(this.data, 6));
    this.emit(this);
  }

  set(obj) {
    this.store.points.reducer("POINT_ATTR", {
      id: this.data.get("id"),
      attr: obj
    });
    this.update();
  }

  getset(key, param) {
    if (param.length > 0) {
      log.action(`point - set - Store ${this.store.data.get("id")}`);
      log.data(log.pad(`${key}: ${param}`, 6));

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
  $x() {
    return {
      type: "pointRef",
      data: { id: this.id, attr: "x" }
    };
  }

  y(...args) {
    return this.getset("y", args);
  }

  $y() {
    return {
      type: "pointRef",
      data: { id: this.id, attr: "y" }
    };
  }

  id(id) {
    if (id) {
      throw new Error("point.id() can only be called not set.");
    }
    return this.data.get("id");
  }

  setStore(args) {
    if (args) {
      this.store = args;
    }
    return this.store;
  }

  // move the point by xy
  move(x, y) {
    this.store.points.reducer("POINT_MOVE", {
      id: this.data.get("id"),
      x,
      y
    });
    this.update();
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

    this.update();
    return this;
  }

  toString() {
    console.log("-----toString", this.data);
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
