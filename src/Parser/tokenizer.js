import { isNum, isAlpha } from "./util";

class TokenizerError extends Error {
  constructor(tokens, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);

    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, TokenizerError);
    }

    this.name = "TokenizerError";
    // Custom debugging information
    this.tokens = tokens;
  }
}

const Tokenizer = (inStr) => {
  let tokens = [];
  let str = inStr.trim();
  var s = "";

  for (var index = 0; index < str.length; index++) {
    s += str[index];
    const peek = str[index + 1];
    if (isNum(s.trim()) && !isNum(peek)) {
      tokens.push({ __type: "num", value: s.trim() });
      s = "";
      continue;
    }

    if (isAlpha(s.trim()) && !isAlpha(peek)) {
      tokens.push({ __type: "alpha", value: s.trim() });
      s = "";
      continue;
    }

    if (s.trim() === "(") {
      tokens.push({ __type: "lparen" });
      s = "";
      continue;
    }

    if (s.trim() === ")") {
      tokens.push({ __type: "rparen" });
      s = "";
      continue;
    }

    if (s.trim() === ",") {
      tokens.push({ __type: "coma" });
      s = "";
      continue;
    }

    if (s.trim() === "+") {
      tokens.push({ __type: "add" });
      s = "";
      continue;
    }
    if (s.trim() === "*" || s.trim() === "×") {
      tokens.push({ __type: "mul" });
      s = "";
      continue;
    }
    if (s.trim() === "/" || s.trim() === "÷") {
      tokens.push({ __type: "div" });
      s = "";
      continue;
    }
    if (s.trim() === "+") {
      tokens.push({ __type: "add" });
      s = "";
      continue;
    }
    if (s.trim() === "-" || s.trim() === "–") {
      tokens.push({ __type: "sub" });
      s = "";
      continue;
    }
  }

  if (s.length !== 0) {
    throw new TokenizerError(tokens, "couldn't tokenize expression");
  }

  return tokens;
};

export default Tokenizer;
