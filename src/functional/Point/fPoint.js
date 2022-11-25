import { uuid } from "../../uuid";
import { Overload } from "../../util/overload";

export const POINT_TYPE = {
  LINE: "line",
  MOVE: "move",
  CURVE: "curve",
  OFFCURVE: "offcurve",
  CLOSE: "close",
};

export const Point = (...args) => {
  let { id, x, y, type } = Overload(["x", "y", "type"], args);

  return {
    element: "point",
    id: id || uuid(),
    x: x || 0,
    y: y || 0,
    type: type || POINT_TYPE.MOVE,
    selected: false,
  };
};

