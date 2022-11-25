import Tokenizer from "./tokenizer";
import Parser from "./parser";

const add = (iterator, ast) => {
  let { type, ...payload } = ast;
  let lastIndex = iterator.tokens.length - 1;
  let lastType = iterator.tokens[lastIndex]?.__type;

  if (type === "text" && lastType === type) {
    iterator.tokens[lastIndex].value += payload.value;
  } else {
    iterator.tokens.push(ast);
  }
};

const Walker = (iterator, ast) => {
  if (typeof ast !== "object") {
    add(iterator, { __type: "text", value: `${ast}` });
    return;
  }
  switch (ast.__type) {
    case "num":
      add(iterator, { __type: "text", value: `${ast.value}` });
      break;

    case "add":
      Walker(iterator, ast.left);
      add(iterator, { __type: "text", value: " + " });
      Walker(iterator, ast.right);
      break;

    case "sub":
      Walker(iterator, ast.left);
      add(iterator, { __type: "text", value: " – " });
      Walker(iterator, ast.right);
      break;

    case "mul":
      Walker(iterator, ast.left);
      add(iterator, { __type: "text", value: " × " });
      Walker(iterator, ast.right);
      break;

    case "div":
      Walker(iterator, ast.left);
      add(iterator, { __type: "text", value: " ÷ " });
      Walker(iterator, ast.right);
      break;

    case "group":
      add(iterator, { __type: "text", value: "(" });
      Walker(iterator, ast.content);
      add(iterator, { __type: "text", value: ")" });
      break;

    case "reference":
      add(iterator, ast);
      // Walker(iterator, ast);
      break;

    case "func":
      add(iterator, { __type: "text", value: `${ast.name}(` });
      ast.args.forEach((item, index, arr) => {
        Walker(iterator, item);
        if (index < arr.length - 1) {
          add(iterator, { __type: "text", value: ", " });
        }
      });
      add(iterator, { __type: "text", value: ")" });
      break;

    default:
      return `⚠️ AST ${iterator.__type}`;
  }
};

const Stringify = (ast) => {
  if (!ast) {
    return;
  }

  const iterator = {
    tokens: [
      // { __type: "text", value: "" }
    ],
  };

  Walker(iterator, ast);

  return iterator.tokens;
};

export const TokenToStr = (tokens) => {
  if (!tokens) {
    return "";
  }
  return tokens.map((item) => item.value).join("");
};

function removeZeroWidth(str) {
  return str.replaceAll("/u200B", "");
}

export const SlateToExpr = (slate) => {
  const tokens = [];
  if (slate.length) {
    slate.forEach((item) => {
      switch (item.type) {
        case "text":
          tokens.push(...Tokenizer(item.children[0].text));
          break;
        case "reference":
          tokens.push({
            __type: item.type,
            id: item.data.id,
            type: item.data.type,
            attribute: item.data.attribute,
          });
          break;
        default:
      }
    });
  }
  tokens.push({
    __type: "eof",
  });
  return Parser(tokens);
};

export const TokenToSlate = (tokens) => {
  if (!tokens) {
    return [
      {
        type: "text",
        children: [
          {
            text: "",
          },
        ],
      },
    ];
  }

  let state = tokens.map((item) => {
    switch (item.__type) {
      case "text":
        return {
          type: "text",
          children: [
            {
              text: item.value,
            },
          ],
        };

      case "reference":
        return {
          type: "reference",
          data: {
            ...item,
          },
          children: [{ text: "" }],
        };

      default:
        return {
          type: "text",
          children: [
            {
              text: `⚠️ AST ${item.__type}`,
            },
          ],
        };
    }
  });

  // return state;

  return [
    {
      type: "text",
      children: [
        {
          // text: "",
          text: "\u200B",
        },
      ],
    },
    ...state,
    {
      type: "text",
      children: [
        {
          // text: "",
          text: " ",
        },
      ],
    },
  ];
};

export default Stringify;
