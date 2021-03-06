import { defaultContour, setAttr, pointPush } from "./ContourUtil";

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

  addContour(id, load) {
    const newContour = defaultContour()
      .merge(load)
      .merge({ id });
    this.set(id, newContour);
  }

  attrContour(id, attr) {
    const newContour = setAttr(this.get(id), attr);
    this.set(id, newContour);
  }

  pointPush(id, pointId) {
    const newContour = pointPush(this.get(id), pointId);
    this.set(id, newContour);
  }

  // movePoint(id, load) {
  //   const { data } = this;
  //   const newContour = move(data.get(id), load.x, load.y);
  //   this.data = data.mergeDeep(data, { [id]: newContour });
  //   this.eventHandler.emit("contours", id, newContour);
  // }
  //
  // scalePoint(id, load) {
  //   const { data } = this;
  //   const newContour = scale(data.get(id), load.x, load.y);
  //   this.data = data.mergeDeep(data, { [id]: newContour });
  //   this.eventHandler.emit("contours", id, newContour);
  // }

  reducer(action, load) {
    // console.log(`$$ contour store ${this.props.parent().data.get("id")} –– ${action}`)

    switch (action) {
      case "CONTOUR_ADD":
        this.addContour(load.id, load.attr);
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
