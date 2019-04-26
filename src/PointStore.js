import { List, Map } from "immutable";
import Event from "./Event";
import { keyIn } from "./util";
import { uuid } from "./uuid";
const picker = keyIn(['x','y','type'])

class PointStore {
  constructor() {
    this.data = Map();
    this.eventHandler = new Event();
  }

  static get pointType() {
    return {
      none: null,
      move: "move",
      line: "line",
      offcurve: "offcurve",
      curve: "curve",
      qcurve: "qcurve"
    };
  }

  get pointType() {
    return this.constructor.pointType;
  }



  register(id, cb) {
    // console.log("register", id);
    this.eventHandler.on(id, cb);

    // console.log("register data", this.data.get(id));
    //   this.events[id] =  () => cb(this.data.get(id));

    // console.log("end register");
  }

  defaultPoint(id) {
    return Map({
      id: id || uuid(),
      x: 0.0,
      y: 0.0,
      type: this.pointType.none
    });
  }

  reducer(action, load) {
    let data = this.data;

            const dataLoad = Map(load).filter(keyIn('x', 'y',"type")); // pick


    switch (action) {
      case "SET_HEROES_TO_GROUP":
        return data.mergeDeep(data, {
          guilds: { groups: { heroes: action.payload.heroes } }
        });

      case "POINT_ADD":
        let newPoint = this.defaultPoint(load.id);
        this.data = data.mergeDeep(data, { [load.id]: newPoint });

        console.log("add this.data", JSON.stringify(this.data));
        this.eventHandler.emit(load.id, newPoint);

        break;

      case "POINT_ATTR":
        // console.log("attr data", JSON.stringify(data));
        // console.log(`attr data[${load.id}]`, JSON.stringify(data[load.id]));
        // let attrPoint = data.get(load.id).merge(Map(load).filter(picker));

// console.log("-----attr data id",load.id)
//         console.log("-----attr data get", data.get(load.id))
// console.log("-----dataLoad", dataLoad)
        let attrPoint = data.get(load.id).merge(dataLoad);
        // let attrPoint = data.get(load.id).merge(load);




        this.data = data.mergeDeep(data, { [load.id]: attrPoint });

        // console.log("attr this.data", JSON.stringify(this.data));
        this.eventHandler.emit(load.id, attrPoint);

        break;

      case "POINT_MOVE":
        let oldMovePoint = data.get(load.id);
        let movePoint = data.get(load.id).merge({
          x: oldMovePoint.get("x") + load.x,
          y: oldMovePoint.get("y") + load.y
        });

        this.data = data.mergeDeep(data, { [load.id]: movePoint });
        this.eventHandler.emit(load.id, movePoint);

        break;
      case "POINT_SCALE":
        let oldScalePoint = data.get(load.id);
        let scalePoint = data.get(load.id).merge({
          x: oldScalePoint.get("x") * load.x,
          y: oldScalePoint.get("y") * load.y
        });

        this.data = data.mergeDeep(data, { [load.id]: scalePoint });
        this.eventHandler.emit(load.id, scalePoint);

        break;

      default: {
        console.log("no default");
      }
    }
  }

  setAttr(attr, val) {
    this.data = this.data.set(attr, val);
  }

  // addPoint(point) {
  //   if (point) {
  //     this.data = this.data.updateIn(["points"], points => points.push(point));
  //   }
  // }
}

export default PointStore;
