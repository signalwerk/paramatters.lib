import { List, Map } from "immutable";
import {
  defaultContour,
  setAttr,
  resolve,
  pointPush,
  move,
  scale
} from "./ContourUtil";
import Event from "../Event";

class ContourStore {
  constructor(props) {
    this.props = props;
  }

  store() {
    return this.props.parent();
  }

  set(id, contour) {
    this.props.set(id, contour);
  }

  get(id) {
    return this.props.get(id);
  }

  addContour(id) {
    const newContour = defaultContour(id);
    this.set(id, newContour);
    this.store().emit(id, newContour);
  }

  attrContour(id, attr) {
    const newContour = setAttr(this.get(id), attr);
    this.set(id, newContour);
    this.store().emit(id, newContour);
  }

  pointPush(id, pointId) {
    const newContour = pointPush(this.get(id), pointId);
    this.set(id, newContour);
    this.store().emit(id, newContour);
  }

  // movePoint(id, load) {
  //   const { data } = this;
  //   const newContour = move(data.get(id), load.x, load.y);
  //   this.data = data.mergeDeep(data, { [id]: newContour });
  //   this.eventHandler.emit(id, newContour);
  // }
  //
  // scalePoint(id, load) {
  //   const { data } = this;
  //   const newContour = scale(data.get(id), load.x, load.y);
  //   this.data = data.mergeDeep(data, { [id]: newContour });
  //   this.eventHandler.emit(id, newContour);
  // }

  reducer(action, load) {
    // console.log(`$$ contour store ${this.props.parent().data.get("id")} –– ${action}`)

    switch (action) {
      case "CONTOUR_ADD":
        this.addContour(load.id);
        break;

      case "CONTOUR_ATTR":
        this.attrContour(load.id, load.attr);
        break;

      case "CONTOUR_PUSH_POINT":
        this.pointPush(load.id, load.pointId);
        break;
      //
      // case "CONTOUR_MOVE":
      //   this.movePoint(load.id, load);
      //   break;
      //
      // case "CONTOUR_SCALE":
      //   this.scalePoint(load.id, load);
      //   break;

      default: {
        console.log("no default");
      }
    }
  }
}

export default ContourStore;
