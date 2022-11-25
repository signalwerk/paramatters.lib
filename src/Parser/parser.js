import { advance, consume, match, current } from "./iterator";

const parse = (iterator) => {
  let val = exp(iterator);
  match(iterator, "eof");
  return val;
};

const exp = (iterator) => {
  const left = term(iterator);
  if (
    current(iterator).__type === "add" ||
    current(iterator).__type === "sub"
  ) {
    return {
      ...consume(iterator),
      left,
      right: exp(iterator),
    };
  }
  return left;
};

const term = (iterator) => {
  const left = func(iterator);
  if (
    current(iterator).__type === "mul" ||
    current(iterator).__type === "div"
  ) {
    return {
      ...consume(iterator),
      left,
      right: exp(iterator),
    };
  }
  return left;
};

const func = (iterator) => {
  if (current(iterator).__type === "alpha") {
    let f = consume(iterator).value;
    match(iterator, "lparen");

    let args = [];
    let parseArg = true;
    while (parseArg) {
      args.push(exp(iterator));
      if (current(iterator).__type === "coma") {
        advance(iterator);
      } else {
        parseArg = false;
      }
    }
    match(iterator, "rparen");
    return { __type: "func", name: f, args };
  } else {
    return factor(iterator);
  }
};

const factor = (iterator) => {
  if (current(iterator).__type === "lparen") {
    consume(iterator);
    const val = exp(iterator);
    match(iterator, "rparen");
    return { __type: "group", content: val };
  } else {
    return digit(iterator);
  }
};

const digit = (iterator) => {
  // if (typeof current(iterator) !== "object") {
  //   return consume(iterator);
  // }

  if (current(iterator).__type === "num") {
    return consume(iterator);
  } else if (current(iterator).__type === "reference") {
    return consume(iterator);
  } else {
    // throw new Error(`Expected a num got '${current(iterator).__type}'`);
  }
};

const Parser = (tokens, options) => {
  const iterator = {
    access: function (i) {
      return this.load[i];
    },
    match: (item) => {
      return item.__type;
    },
    load: tokens,
    index: 0,
  };

  return parse(iterator);
};

export default Parser;
