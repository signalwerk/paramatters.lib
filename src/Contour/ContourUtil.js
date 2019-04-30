import { Set, Map, List } from "immutable";
import { uuid } from "../uuid";

export const setKeys = Set(["closed"]);

export const setAttr = (contour, attr) => {
  const dataLoad = Map(attr).filter((val, key) => setKeys.has(key)); // pick
  return contour.merge(dataLoad);
};

export const resolve = (contour, store) => {
  return contour.merge({
    points: contour.get("points").map(item => {
      return store.data.getIn(["points", item]);
    })
  });
};

export const pointPush = (contour, pointId) => {
  return contour.merge({
    points: contour.get("points").push(pointId)
  });
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
    __type: "contour",
    closed: false,
    points: List()
  });
};

const all = {
  defaultContour
};

export default all;
