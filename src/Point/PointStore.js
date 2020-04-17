import { Map } from "immutable";
import { defaultPoint, setAttr, move, scale } from "./PointUtil";

class PointStore {
  constructor(props) {
    this.props = props;
  }

  store() {
    return this.props.parent();
  }

  set(id, point) {
    this.props.set(id, point);
  }

  get(id) {
    return this.props.get(id);
  }

  addPoint(load) {
    const id = load.get("id");
    const newPoint = defaultPoint(id).merge(load);

    this.set(newPoint.get("id"), newPoint);
  }

  attrPoint(id, attr) {
    const newPoint = setAttr(this.get(id), attr);
    this.set(id, newPoint);
  }

  movePoint(id, x, y) {
    const newPoint = move(this.get(id), x, y);
    this.set(id, newPoint);
  }

  scalePoint(id, x, y) {
    const newPoint = scale(this.get(id), x, y);
    this.set(id, newPoint);
  }

  reducer(action, load) {
    switch (action) {
      case "POINT_ADD":
        this.addPoint(Map(load));
        break;

      case "POINT_ATTR":
        this.attrPoint(load.id, load.attr);
        break;

      case "POINT_MOVE":
        this.movePoint(load.id, load.x, load.y);
        break;

      case "POINT_SCALE":
        this.scalePoint(load.id, load.x, load.y);
        break;

      default: {
        console.log("no default");
      }
    }
  }
}

export default PointStore;
