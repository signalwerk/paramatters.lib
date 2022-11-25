// https://gist.github.com/davidgilbertson/6eae478d9a197bfa1b4dfbef38f787e5

const debug = false;

const log = {};
log.pad = (str, padding) =>
  (str || "")
    .split("\n")
    .map(line => " ".repeat(padding || 0) + line)
    .join("\n");

log.json = (data, padding) => log.pad(JSON.stringify(data, null, 2), padding);

log.action = (...arg) => {
  if (debug) {
    console.log(...arg);
  }
};

log.data = (...arg) => {
  if (debug) {
    console.log(...arg);
  }
};

export default log;
