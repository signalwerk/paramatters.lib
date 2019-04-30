// https://gist.github.com/davidgilbertson/6eae478d9a197bfa1b4dfbef38f787e5

const debug = false;


const colors = {
  Reset: "\x1b[0m",
  Bright: "\x1b[1m",
  Dim: "\x1b[2m",
  Underscore: "\x1b[4m",
  Blink: "\x1b[5m",
  Reverse: "\x1b[7m",
  Hidden: "\x1b[8m",
  Black: "\x1b[30m",
  Red: "\x1b[31m",
  Green: "\x1b[32m",
  Yellow: "\x1b[33m",
  Blue: "\x1b[34m",
  Magenta: "\x1b[35m",
  Cyan: "\x1b[36m",
  White: "\x1b[37m",
  Crimson: "\x1b[38m"
};

// log = new Proxy({}, {get: (x, k) => (...pass) => console.log(`%c${pass.join(' ')}`, `color: ${k}`)});

const log = {};
log.pad = (str, padding) =>
  (str || "")
    .split("\n")
    .map(line => " ".repeat(padding || 0) + line)
    .join("\n");
log.json = (data, padding) => log.pad(JSON.stringify(data, null, 2), padding);

Object.keys(colors).forEach(key => {
  log[key.toLowerCase()] = (...arg) => {
    if (debug) {
      return console.log(colors[key], ...arg, colors.Reset);
    }
    return true;
  };
});

export default log;
