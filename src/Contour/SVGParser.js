// https://github.com/Pomax/js-svg-path/blob/master/svg-parser.js
// keys https://github.com/jxnblk/path-ast/blob/master/lib/keys.js
// https://github.com/Hopding/pdf-lib/blob/master/src/api/svgPath.ts

// https://www.w3.org/TR/SVG/paths.html

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

  calcPoint(isRelative, x, y) {
    let p = {
      x: x || this.current.x,
      y: y || this.current.y
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

    if (this.pos >= this.length) {
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
        // always a start of a path
        this.consumeNumbers();

        p1 = this.calcPoint(isRelative, this.numbers[0], this.numbers[1]);

        console.log("move to", {
          x: p1.x,
          y: p1.y
        });

        this.parseSegment();
        break;

      case "l":
        this.consumeNumbers();

        p1 = this.calcPoint(isRelative, this.numbers[0], this.numbers[1]);

        console.log("line to", {
          x: p1.x,
          y: p1.y
        });

        this.parseSegment();
        break;

      case "c":
        this.consumeNumbers();

        p1 = this.calcPoint(isRelative, this.numbers[0], this.numbers[1]);
        p2 = this.calcPoint(isRelative, this.numbers[2], this.numbers[3]);
        p3 = this.calcPoint(isRelative, this.numbers[4], this.numbers[5]);

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

        p1 = this.calcPoint(isRelative, this.numbers[0], this.numbers[1]);
        p2 = this.calcPoint(isRelative, this.numbers[2], this.numbers[3]);

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

        p1 = this.calcPoint(isRelative, this.numbers[0]);

        console.log("h to", {
          x1: p1.x,
          y1: p1.y
        });

        this.parseSegment();
        break;

      case "v":
        this.consumeNumbers();

        p1 = this.calcPoint(isRelative, null, this.numbers[0]);

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
