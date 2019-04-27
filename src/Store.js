import { Map } from "immutable";
// import Event from "../Event";
// import { defaultPoint, setAttr, move, scale } from "./PointUtil";
import ContourStore from "./Contour/ContourStore";
import PointStore from "./Point/PointStore";

class Store {
  constructor() {
    this.data = Map({
      contours: Map(),
      points: Map()
    });

    this.points = new PointStore({
      set: (id, point) => {
        this.data = this.data.mergeDeep({ points: { [id]: point } });
      },
      get: id => {
        return this.data.getIn(["points", id]);
      }
    });

    this.contours = new ContourStore({
      set: (id, contour) => {
        this.data = this.data.mergeDeep({ contours: { [id]: contour } });
      },
      get: id => {
        return this.data.getIn(["contours", id]);
      }
    });
  }

  // register(id, cb) {
  //   this.points.register(id, cb);
  // }
  //
  // reducer(action, load) {
  //   this.points.reducer(action, load);
  // }
}

export default new Store();
