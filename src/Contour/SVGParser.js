// https://github.com/Pomax/js-svg-path/blob/master/svg-parser.js
// keys https://github.com/jxnblk/path-ast/blob/master/lib/keys.js

import Point from "../Point/Point";
import Contour from "./Contour";

class SVGParser {
  consumeWhitespace() {
    for (let i = this.pos; i < this.length; i++) {
      let c = this.path[i];
      if (" " === c || "\t" === c || "\r" === c || "\n" === c) {
        this.pos++;
        continue;
      }
      return;
    }
  }

  isNumber(currentNumber) {
    const c = this.path[this.pos];

    return (
      (c === "-" && currentNumber.length === 0) || // only on start
      (c === "+" && currentNumber.length === 0) || // only on start
      (c === "." && currentNumber.length === 0) || // only on start
      ("0".charCodeAt(0) <= c.charCodeAt(0) &&
        c.charCodeAt(0) <= "9".charCodeAt(0))
    );
  }

  consumeChar() {
    const c = this.path[this.pos];
    this.pos++;
    return c;
  }

  consumeNumbers() {
    this.consumeWhitespace();

    let currentNumber = "";

    while (this.isNumber(currentNumber)) {
      currentNumber += this.consumeChar();
    }

    this.numbers.push(parseFloat(currentNumber));

    this.consumeWhitespace();

    let c = this.path[this.pos];

    if (c === "," || c === "+") {
      this.pos++;
      this.consumeNumbers();
    }
    if (c === "-") {
      this.consumeNumbers();
    }
  }

  getPoint(isRelative, index) {
    let p = {
      x: this.numbers[index + 0],
      y: this.numbers[index + 1]
    };

    if (isRelative) {
      this.current = {
        x: this.current.x + p.x,
        y: this.current.y + p.y
      };
    } else {
      this.current = {
        x: p.x,
        y: p.y
      };
    }

    return this.current;
  }

  parseSegment() {
    this.numbers = [];

    this.consumeWhitespace();

    if (this.pos >= this.length ) {
      console.log("reach end");
      return;
    }

    let code = this.consumeChar();
    let isRelative = code.toLowerCase() === code;


    let p1 = null;
    let p2 = null;
    let p3 = null;

    switch (code.toLowerCase()) {
      case "m":
        this.consumeNumbers();

        p1 = this.getPoint(isRelative, 0);

        console.log("move to", {
          x: p1.x,
          y: p1.y
        });

        this.parseSegment();
        break;
      case "c":
        this.consumeNumbers();

        p1 = this.getPoint(isRelative, 0);
        p2 = this.getPoint(isRelative, 2);
        p3 = this.getPoint(isRelative, 4);

        console.log("c to", {
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y,
          x3: p3.x,
          y3: p3.y
        });

        this.parseSegment();
        break;

      case "s":
        this.consumeNumbers();

        p1 = this.getPoint(isRelative, 0);
        p2 = this.getPoint(isRelative, 2);

        console.log("s to", {
          x1: p1.x,
          y1: p1.y,
          x2: p2.x,
          y2: p2.y
        });

        this.parseSegment();
        break;

      case "h":
        this.consumeNumbers();

        p1 = this.getPoint(isRelative, 0);

        console.log("h to", {
          x1: p1.x,
          y1: p1.y
        });

        this.parseSegment();
        break;

      case "z":

        console.log("z");

        this.parseSegment();
        break;
      default:
        throw new Error("cant find hander for svg command " + code);
    }
  }

  parser(str) {
    this.path = str;
    this.pos = 0;
    this.length = str.length;
    this.current = { x: 0, y: 0 };

    this.parseSegment();
    console.log("---end");
  }
}

export default SVGParser;
