export const POINT_STYLE = {
  LINE: "line",
  MOVE: "move",
  CURVE: "curve",
  OFFCURVE: "offcurve",
  CLOSE: "close",
};

export const Point = (x, y, type) => {
  return {
    element: "point",
    x: x || 0,
    y: y || 0,
    type: type || POINT_STYLE.MOVE,
  };
};

// export const LineTo = (x, y) => {
//   return Point({ x, y, type: POINT_STYLE.LINE });
// };
//
// export const MoveTo = (x, y) => {
//   return Point({ x, y, type: POINT_STYLE.MOVE });
// };
