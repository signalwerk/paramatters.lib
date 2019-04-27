import { Map } from "immutable";
import Event from "../Event";
import { defaultPoint, setAttr, move, scale } from "./PointUtil";

class PointStore {
  constructor() {
    this.data = Map();
    this.eventHandler = new Event();
  }

  register(id, cb) {
    this.eventHandler.on(id, cb);
  }

  addPoint(id) {
    const { data } = this;
    const newPoint = defaultPoint(id);
    this.data = data.mergeDeep(data, { [id]: newPoint });
    this.eventHandler.emit(id, newPoint);
  }

  attrPoint(id, load) {
    const { data } = this;
    const newPoint = setAttr(data.get(id), load);
    this.data = data.mergeDeep(data, { [id]: newPoint });
    this.eventHandler.emit(id, newPoint);
  }

  movePoint(id, load) {
    const { data } = this;
    const newPoint = move(data.get(id), load.x, load.y);
    this.data = data.mergeDeep(data, { [id]: newPoint });
    this.eventHandler.emit(id, newPoint);
  }

  scalePoint(id, load) {
    const { data } = this;
    const newPoint = scale(data.get(id), load.x, load.y);
    this.data = data.mergeDeep(data, { [id]: newPoint });
    this.eventHandler.emit(id, newPoint);
  }

  reducer(action, load) {
    switch (action) {
      case "POINT_ADD":
        this.addPoint(load.id);
        break;

      case "POINT_ATTR":
        this.attrPoint(load.id, load);
        break;

      case "POINT_MOVE":
        this.movePoint(load.id, load);
        break;

      case "POINT_SCALE":
        this.scalePoint(load.id, load);
        break;

      default: {
        console.log("no default");
      }
    }
  }
}

export default PointStore;
