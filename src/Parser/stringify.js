import Tokenizer from "./tokenizer";
import Parser from "./parser";

const add = (iterator, ast) => {
  let { type, ...payload } = ast;
  let lastIndex = iterator.tokens.length - 1;
  let lastType = iterator.tokens[lastIndex].type;

  if (type === "text" && lastType === type) {
    iterator.tokens[lastIndex].value += payload.value;
  } else {
    iterator.tokens.push(ast);
  }
};

const Walker = (iterator, ast) => {
  switch (ast.type) {
    case "num":
      add(iterator, { type: "text", value: `${ast.value}` });
      break;

    case "add":
      Walker(iterator, ast.left);
      add(iterator, { type: "text", value: " + " });
      Walker(iterator, ast.right);
      break;

    case "sub":
      Walker(iterator, ast.left);
      add(iterator, { type: "text", value: " - " });
      Walker(iterator, ast.right);
      break;

    case "mul":
      Walker(iterator, ast.left);
      add(iterator, { type: "text", value: " * " });
      Walker(iterator, ast.right);
      break;

    case "div":
      Walker(iterator, ast.left);
      add(iterator, { type: "text", value: " / " });
      Walker(iterator, ast.right);
      break;

    case "group":
      add(iterator, { type: "text", value: "(" });
      Walker(iterator, ast.content);
      add(iterator, { type: "text", value: ")" });
      break;

    case "pointRef":
      add(iterator, ast);
      // Walker(iterator, ast);
      break;

    case "func":
      add(iterator, { type: "text", value: `${ast.name}(` });
      ast.args.forEach((item, index, arr) => {
        Walker(iterator, item);
        if (index < arr.length - 1) {
          add(iterator, { type: "text", value: ", " });
        }
      });
      add(iterator, { type: "text", value: ")" });
      break;

    default:
      return `⚠️ AST ${iterator.type}`;
  }
};

const Stringify = ast => {
  if (!ast) {
    return;
  }

  const iterator = {
    tokens: [{ type: "text", value: "" }]
  };

  Walker(iterator, ast);

  return iterator.tokens;
};

export const TokenToStr = tokens => {
  if (!tokens) {
    return "";
  }
  return tokens.map(item => item.value).join("");
};

export const SlateToExpr = slate => {
  const tokens = [];
  if (slate.length) {
    slate.forEach(item => {
      switch (item.type) {
        case "text":
          tokens.push(...Tokenizer(item.children[0].text));
          break;
        case "pointRef":
          tokens.push({
            type: item.type,
            data: { id: item.data.id, attr: item.data.attr }
          });
          break;
        default:
      }
    });
  }

  return Parser(tokens);
};

export const TokenToSlate = tokens => {
  if (!tokens) {
    return [
      {
        type: "text",
        children: [
          {
            text: ""
          }
        ]
      }
    ];
  }
  return tokens.map(item => {
    switch (item.type) {
      case "text":
        return {
          type: "text",
          children: [
            {
              text: item.value
            }
          ]
        };

      case "pointRef":
        return {
          ...item,
          children: [{ text: "" }]
        };

      default:
        return {
          type: "text",
          children: [
            {
              text: `⚠️ AST ${item.type}`
            }
          ]
        };
    }
  });
};

export default Stringify;
