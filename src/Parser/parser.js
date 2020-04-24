import { advance, consume, match, current } from "./iterator";

const parse = iterator => {
  let val = exp(iterator);
  match(iterator, "eof");
  return val;
};

const exp = iterator => {
  const left = term(iterator);
  if (current(iterator).type === "add" || current(iterator).type === "sub") {
    return {
      ...consume(iterator),
      left,
      right: exp(iterator)
    };
  }
  return left;
};

const term = iterator => {
  const left = func(iterator);
  if (current(iterator).type === "mul" || current(iterator).type === "div") {
    return {
      ...consume(iterator),
      left,
      right: exp(iterator)
    };
  }
  return left;
};

const func = iterator => {
  if (current(iterator).type === "alpha") {
    let f = consume(iterator).value;
    match(iterator, "lparen");

    let args = [];
    let parseArg = true;
    while (parseArg) {
      args.push(exp(iterator));
      if (current(iterator).type === "coma") {
        advance(iterator);
      } else {
        parseArg = false;
      }
    }
    match(iterator, "rparen");
    return { type: "func", name: f, args };
  } else {
    return factor(iterator);
  }
};

const factor = iterator => {
  if (current(iterator).type === "lparen") {
    consume(iterator);
    const val = exp(iterator);
    match(iterator, "rparen");
    return { type: "group", content: val };
  } else {
    return digit(iterator);
  }
};

const digit = iterator => {
  if (current(iterator).type === "num") {
    return consume(iterator);
  } else if (current(iterator).type === "pointRef") {
    return consume(iterator);
  } else {
    throw new Error(`Expected a num got '${current(iterator).type}'`);
  }
};

const Parser = (tokens, options) => {
  const iterator = {
    access: function(i) {
      return this.load[i];
    },
    match: item => {
      return item.type;
    },
    load: tokens,
    index: 0
  };

  return parse(iterator);
};

export default Parser;
