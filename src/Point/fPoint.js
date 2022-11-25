import { uuid } from "../uuid";
import { Overload } from "../util/overload";

export const POINT_STYLE = {
  LINE: "line",
  MOVE: "move",
  CURVE: "curve",
  OFFCURVE: "offcurve",
  CLOSE: "close",
};

const attr = ["x", "y", "type"];

const change = {
  move: ["x", "y"],
  x: ["x"],
  y: ["y"],
};

// https://stackoverflow.com/questions/122102/what-is-the-most-efficient-way-to-deep-clone-an-object-in-javascript/10916838#10916838
// extends 'from' object with members from 'to'. If 'to' is null, a deep clone of 'from' is returned
function extend(from, to) {
  if (from == null || typeof from != "object") return from;
  if (from.constructor != Object && from.constructor != Array) return from;
  if (
    from.constructor == Date ||
    from.constructor == RegExp ||
    from.constructor == Function ||
    from.constructor == String ||
    from.constructor == Number ||
    from.constructor == Boolean
  )
    return new from.constructor(from);

  to = to || new from.constructor();

  for (var name in from) {
    to[name] =
      typeof to[name] == "undefined" ? extend(from[name], null) : to[name];
  }

  return to;
}

class Callable extends Function {
  constructor() {
    super();

    return new Proxy(this, {
      apply: (target, thisArg, args) => target._call(...args),
    });
  }
}

// https://javascript.info/currying-partials
// function curry(func) {
//   return function curried(...args) {
//     if (args.length >= func.length) {
//       return func.apply(this, args);
//     } else {
//       return function (...args2) {
//         return curried.apply(this, args.concat(args2));
//       };
//     }
//   };
// }

// let nCurry = (n) => (f, ...args) => {
//   return function (...nargs) {
//     let combinedArgs = args.concat(nargs);
//     if (combinedArgs.length < n) {
//       combinedArgs.unshift(f);
//       return _curry.apply(null, largs);
//     } else {
//       return f.apply(null, largs);
//     }
//   };
// };

const _move = (x, y, point) => {
  return { ...extend(point), x: point.x + x, y: point.y + y };
};

// https://github.com/30-seconds/30-seconds-of-code/blob/master/snippets/curry.md
const curry = (fn, arity = fn.length, ...args) =>
  arity <= args.length ? fn(...args) : curry.bind(null, fn, arity, ...args);

const move = (...args) => curry(_move)(...args);

class AnotherCallable extends Callable {
  constructor() {
    super();
  }

  move(...args) {
    return move(...args);
  }

  _call(...args) {
    let { id, x, y, type } = Overload(["x", "y", "type"], args);

    return {
      element: "point",
      id: id || uuid(),
      x: x || 0,
      y: y || 0,
      type: type || POINT_STYLE.MOVE,
    };
  }
}

export const Point = new AnotherCallable();
// export const Point = (x, y, type, state) => {
//   return {
//     element: "point",
//     id: uuid(),
//     x: x || 0,
//     y: y || 0,
//     type: type || POINT_STYLE.MOVE,
//     state,
//   };
// };

// export const LineTo = (x, y) => {
//   return Point({ x, y, type: POINT_STYLE.LINE });
// };
//
// export const MoveTo = (x, y) => {
//   return Point({ x, y, type: POINT_STYLE.MOVE });
// };
