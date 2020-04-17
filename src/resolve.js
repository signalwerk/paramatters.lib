import { isNumber } from "./util";

const evaluate = (val, store) => {
  if (isNumber(val)) {
    return val;
  }

  switch (val.type) {
    case "point":
      return store.data.getIn(["points", val.id]).get(val.attr);
    case "add":
      return evaluate(val.left, store) + evaluate(val.right, store);
    case "sub":
      return evaluate(val.left, store) - evaluate(val.right, store);
    case "mul":
      return evaluate(val.left, store) * evaluate(val.right, store);
    case "div":
      return evaluate(val.left, store) / evaluate(val.right, store);
    default:
      throw new Error(`evaluate error`, val);
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
      y
    });
  }

  if (candidate.get("type") === "contour") {
    return candidate.merge({
      points: candidate.get("points").map(item => {
        return resolveItem(item, store);
      })
    });
  }
  if (candidate.get("type") === "store") {
    return candidate.merge({
      contours: candidate.get("contours").map(item => {
        return resolveItem(item, store);
      })
    });
  }
  return null;
};

const add = (left, right) => ({
  type: "add",
  left,
  right
});

const sub = (left, right) => ({
  type: "sub",
  left,
  right
});

const mul = (left, right) => ({
  type: "mul",
  left,
  right
});

const div = (left, right) => ({
  type: "div",
  left,
  right
});
export const Operators = {
  add,
  sub,
  mul,
  div
};

export default resolveItem;
