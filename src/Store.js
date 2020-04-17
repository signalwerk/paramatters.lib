import { List, Map } from "immutable";
import { uuid } from "./uuid";
// import { defaultPoint, setAttr, move, scale } from "./PointUtil";
import ContourStore from "./Contour/ContourStore";
import PointStore from "./Point/PointStore";
import resolve from "./resolve";

class Store {
  constructor() {
    this.data = Map({
      id: uuid(),
      type: "store",
      contours: Map(),
      points: Map(),
      events: Map({
        points: Map(),
        contours: Map()
      })
    });

    this.points = new PointStore({
      parent: () => this,
      set: (id, point) => {
        this.data = this.data.setIn(["points", id], point);
      },
      get: id => {
        return this.data.getIn(["points", id]);
      }
    });

    this.contours = new ContourStore({
      parent: () => this,
      set: (id, contour) => {
        this.data = this.data.setIn(["contours", id], contour);
      },
      get: id => {
        return this.data.getIn(["contours", id]);
      }
    });
  }

  resolve(item) {
    return resolve(item, this);
  }


  // merge(otherStore) {
  //   this.data = this.data.mergeDeep(otherStore.data);
  //   return this;
  // }

  toString() {
    return JSON.stringify(this.data, null, 2);
  }

  toJS() {
    return this.data.toJS();
  }
}

export default Store;
