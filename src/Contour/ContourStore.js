import { Map } from "immutable";
import { defaultContour, setAttr, move, scale } from "./ContourUtil";
import Event from "../Event";

class ContourStore {
  constructor() {
    this.data = Map({ contours: Map(), points: Map() });
    this.eventHandler = new Event();
  }

  register(id, cb) {
    this.eventHandler.on(id, cb);
  }

  update(id, contour) {
    this.data = this.data.mergeDeep({ contours: { [id]: contour } });
  }

  get(id) {
    return this.data.getIn(["contours", id]);
  }

  addContour(id) {
    const newContour = defaultContour(id);
    this.update(id, newContour);
    this.eventHandler.emit(id, newContour);
  }

  attrContour(id, attr) {
    const newContour = setAttr(this.get(id), attr);
    this.update(id, newContour);
    this.eventHandler.emit(id, newContour);
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
    switch (action) {
      case "CONTOUR_ADD":
        this.addContour(load.id);
        break;

      case "CONTOUR_ATTR":
        this.attrContour(load.id, load.attr);
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
