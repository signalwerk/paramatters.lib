import { Map } from "immutable";
import Store from "../Store";
import { uuid } from "../uuid";
import Child from "../child";
import log from "../log";
import Point from "../Point/Point";

class Contour {
  constructor(...args) {
    this.store = new Store();
    this.data = null;

    let id = null;
    let argNew = null;

    if (args.length <= 1) {
      argNew = Map(args[0]);
      if (argNew.get("forceId") === true) {
        id = argNew.get("id");
      } else {
        id = uuid();
      }
    }

    this.store.register(id, newData => this.onChange(newData));

    this.points = new Child({
      parent: this,
      parentType: "contour",
      memeberType: "point",
      getter: () => this.data.get("points"),
      create: attr => new Point(attr.merge({ forceId: true }))
    });

    this.init(argNew.merge({ id }));

    return this;
  }

  init(args) {
    this.store.contours.reducer("CONTOUR_ADD", {
      id: args.get("id"),
      attr: args
    });
  }

  onChange(newData) {
    log.cyan(`contour - onChange - Store ${this.store.data.get("id")}`);
    log.white(log.json(newData, 6));
    this.data = newData; // resolve(newData, this.store);
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

  id(id) {
    if (id) {
      throw new Error("contour.id() can only be called not set.");
    }
    return this.data.get("id");
  }

  setStore(args) {
    if (args) {
      this.store = args;
    }
    return this.store;
  }

  toString() {
    return JSON.stringify(this.store.resolve(this.data));
  }

  toJS() {
    return this.store.resolve(this.data).toJS();
  }

  // copy a point without the events
  clone() {
    return new Contour(this.data);
  }
}

export default Contour;
