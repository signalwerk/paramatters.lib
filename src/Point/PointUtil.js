import { Set, Map } from "immutable";
import { uuid } from "../uuid";

export const PointType = {
  none: null,
  move: "move",
  line: "line",
  offcurve: "offcurve",
  curve: "curve",
  qcurve: "qcurve"
};

export const setKeys = Set(["x", "y", "type"]);

export const setAttr = (point, attr) => {
  const dataLoad = Map(attr).filter((val, key) => setKeys.has(key)); // pick
  return point.merge(dataLoad);
};

export const move = (point, x, y) => {
  return point.merge({
    x: point.get("x") + x,
    y: point.get("y") + y
  });
};

export const scale = (point, x, y) => {
  return point.merge({
    x: point.get("x") * x,
    y: point.get("y") * y
  });
};

export const defaultPoint = id => {
  return Map({
    id: id || uuid(),
    x: 0.0,
    y: 0.0,
    type: PointType.none
  });
};

const all = {
  defaultPoint,
};

export default all;
