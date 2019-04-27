import { Set, Map } from "immutable";
import { uuid } from "../uuid";

export const setKeys = Set(["closed"]);

export const setAttr = (contour, attr) => {
  const dataLoad = Map(attr).filter((val, key) => setKeys.has(key)); // pick
  return contour.merge(dataLoad);
};

export const move = (contour, x, y) => {
  return contour.merge({
    x: contour.get("x") + x,
    y: contour.get("y") + y
  });
};

export const scale = (contour, x, y) => {
  return contour.merge({
    x: contour.get("x") * x,
    y: contour.get("y") * y
  });
};

export const defaultContour = id => {
  return Map({
    id: id || uuid(),
    closed: false
  });
};

const all = {
  defaultContour
};

export default all;
