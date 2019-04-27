import chai, { expect } from "chai";
import chaiUuid from "chai-uuid";
import Contour from "../../src/Contour/Contour";
import Point from "../../src/Point/Point";

chai.use(chaiUuid);

describe("Contour", () => {
  it("should equal the default values on init", () => {
    const c = new Contour();
    expect(c.closed()).to.be.equal(false);
  });

  it("should set all attributes when constructed with an object", () => {
    const c = new Contour({
      closed: true
    });

    expect(c.closed()).to.be.equal(true);
  });

  describe("set & get", () => {
    it("should set all attributes by separate functions", () => {
      const c = new Contour();

      c.closed(true);

      expect(c.closed()).to.be.equal(true);
    });
  });

  describe("child handling", () => {
    it("should append point to contour", () => {
      const c = new Contour();
      const p = new Point();

      // console.log("----", c.points.get())
      // expect(c.points.get().length()).to.be.equal(0);

      // c.points.push(p);
      p.x(5);
      // expect(c.points.length()).to.be.equal(1);
    });
  });
});
