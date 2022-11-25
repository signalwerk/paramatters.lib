import { assert } from "chai";
import Lib from "../src/index";

describe("lib", () => {
  it("should work", () => {
    const lib = new Lib();
    const n = 5;
    assert.equal(lib.render(n), `I am a dependency + ${n}`);
    assert.equal(1, 1);
  });
});
