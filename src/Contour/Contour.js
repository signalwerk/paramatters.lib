import { Map } from "immutable";
import Store from "../Store";
import { uuid } from "../uuid";
import { isObject, pick } from "../util";
import ArrayObserve from "../arrayObserve";
import log from "../log";

const attr = ["closed"];

class Contour {
  constructor(...args) {
    this.store = new Store();
    this.data = null;
    this.events = [];

    let argNew = Map();

    if (args.length === 1 && isObject(args[0])) {
      argNew = argNew.merge(pick(args[0], attr));

      if (args[0] && args[0].forceId && args[0].id) {
        argNew = argNew.merge({ id: args[0].id });
      }
    }

    if (!argNew.get("id")) {
      argNew = argNew.merge({ id: uuid() });
    }

    this.init(argNew);
    this.initPoints();
    this.id = argNew.get("id");
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
    this.store.contours.reducer("CONTOUR_ADD", {
      id: args.get("id"),
      attr: args
    });
  }

  update(newData) {
    log.action(`contour - update - Store ${this.store.data.get("id")}`);
    this.data = this.store.contours.get(this.id);
    log.data(log.json(this.data, 6));
    this.emit(this);
  }

  set(obj) {
    this.store.contours.reducer("CONTOUR_ATTR", {
      id: this.id,
      attr: obj
    });
    this.update();
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

  close() {
    this.set({ closed: true });
    return this;
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

  resolve() {
    console.log("resolve", this.data);
    return this.store.resolve(this.data);
  }

  // copy a point without the events
  clone() {
    return new Contour(this.data);
  }

  initPoints() {
    this._points = [];
    this.points = new Proxy(this._points, ArrayObserve(this));
  }
}

export default Contour;
