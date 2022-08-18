import { isNumber } from "./util";

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math
const evaluateFunc = (val, store) => {
  if (val.type !== "func") {
    throw new Error(`function evaluate error ${val.type}`, val);
  }

  switch (val.name) {
    case "min":
      return Math.min(...val.args.map((item) => evaluate(item, store)));
    case "max":
      return Math.max(...val.args.map((item) => evaluate(item, store)));
    case "pow":
      if (val.args.length !== 2) {
        throw new Error(`function pow requires two arguments`, val);
      }
      return Math.pow(evaluate(val.args[0]), evaluate(val.args[1]));
    case "abs":
      if (val.args.length !== 1) {
        throw new Error(`function abs requires one argument`, val);
      }
      return Math.abs(evaluate(val.args[0]));
    case "sin":
      if (val.args.length !== 1) {
        throw new Error(`function sin requires one argument`, val);
      }
      return Math.sin(evaluate(val.args[0]));
    case "cos":
      if (val.args.length !== 1) {
        throw new Error(`function cos requires one argument`, val);
      }
      return Math.cos(evaluate(val.args[0]));

    default:
      throw new Error(`function evaluate error ${val.type}`, val);
  }
};

const evaluate = (val, store) => {
  if (isNumber(val)) {
    return val;
  }

  // if (typeof val === "string" || val instanceof String) {
  //   return parseFloat(val);
  // }
  // it's a string

  switch (val.type) {
    case "pointRef":
      return evaluate(
        store.data.getIn(["points", val.data.id]).get(val.data.attr),
        store
      );
    case "add":
      return (
        parseFloat(evaluate(val.left, store)) +
        parseFloat(evaluate(val.right, store))
      );
    case "sub":
      return (
        parseFloat(evaluate(val.left, store)) -
        parseFloat(evaluate(val.right, store))
      );
    case "mul":
      return (
        parseFloat(evaluate(val.left, store)) *
        parseFloat(evaluate(val.right, store))
      );
    case "div":
      return (
        parseFloat(evaluate(val.left, store)) /
        parseFloat(evaluate(val.right, store))
      );
    case "num":
      return val.value;

    case "group":
      return evaluate(val.content, store);

    case "func":
      return evaluateFunc(val, store);

    default:
      throw new Error(`evaluate error ${val.type}`, val);
  }
};

const resolveItem = (candidate, store) => {
  if (candidate.get("type") === "point") {
    const p = store.data.getIn(["points", candidate.get("id")]);

    let x = p.get("x");
    let y = p.get("y");

    if (!isNumber(x)) {
      x = evaluate(x, store);
    }

    if (!isNumber(y)) {
      y = evaluate(y, store);
    }

    return p.merge({
      x,
      y,
    });
  }

  if (candidate.get("type") === "contour") {
    return candidate.merge({
      points: candidate.get("points").map((item) => {
        return resolveItem(item, store);
      }),
    });
  }
  if (candidate.get("type") === "store") {
    return candidate.merge({
      contours: candidate.get("contours").map((item) => {
        return resolveItem(item, store);
      }),
    });
  }
  return null;
};

let wrapNumb = (val) => (isNumber(val) ? { type: "num", value: val } : val);

const add = (left, right) => ({
  type: "add",
  left: wrapNumb(left),
  right: wrapNumb(right),
});

const sub = (left, right) => ({
  type: "sub",
  left: wrapNumb(left),
  right: wrapNumb(right),
});

const mul = (left, right) => ({
  type: "mul",
  left: wrapNumb(left),
  right: wrapNumb(right),
});

const div = (left, right) => ({
  type: "div",
  left: wrapNumb(left),
  right: wrapNumb(right),
});
export const Operators = {
  add,
  sub,
  mul,
  div,
};

export default resolveItem;
