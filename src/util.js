// https://gist.github.com/jed/982883
// this can be any function that returns a string
import { Set } from "immutable";

export const isNumber = n => {
  return typeof n === "number";
};

// https://www.oreilly.com/library/view/mastering-immutablejs/9781788395113/b8bcec1d-987f-45e6-a74a-7b4dc27aa6a4.xhtml
// export const pick = (...props) => map => map.filter((v, k) => props.includes(k));
// export const omit = (...props) => map => map.filterNot((v, k) => props.includes(k));
