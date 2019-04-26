import chai, { expect } from "chai";
import chaiUuid from "chai-uuid";
import Point from "../src/Point";
import PointStore from "../src/PointStore";

chai.use(chaiUuid);

describe("Point", () => {
  it("should equal the default values on init", () => {
    const p = new Point();

    expect(p.x()).to.be.equal(0);
    expect(p.y()).to.be.equal(0);
    expect(p.type()).to.be.equal(null);
    expect(p.id()).to.be.a.uuid("v4");
  });

  it("should set x/y with two arguments on constructor", () => {
    var p = new Point(220, 330);

    expect(p.x()).to.be.equal(220);
    expect(p.y()).to.be.equal(330);
  });

  it("should set all attributes when constructed with an object", () => {
    var p = new Point({
      type: PointStore.pointType.line,
      x: 200,
      y: 300,
      id: "testid"
    });

    expect(p.type()).to.be.equal(PointStore.pointType.line);
    expect(p.x()).to.be.equal(200);
    expect(p.y()).to.be.equal(300);
    expect(p.id()).not.to.be.equal("testid");
    expect(p.id()).to.be.a.uuid("v4");
  });

  it("should set all attributes by separate functions", () => {
    var p = new Point();

    p.type(PointStore.pointType.line);
    p.x(2);
    p.y(3);
    p.id("kä@k");

    expect(p.type()).to.be.equal(PointStore.pointType.line);
    expect(p.x()).to.be.equal(2);
    expect(p.y()).to.be.equal(3);
    expect(p.id()).not.to.be.equal("kä@k");
    expect(p.id()).to.be.a.uuid("v4");
    // expect(p.print()).to.be.equal('name: test\ntype: line\nx: 2\ny: 3\nsmooth: true\nid: kä@k');
  });

  it("should set scale a point", () => {
    var p = new Point();
    p.x(2);
    p.y(3);
    p.scale(2);

    expect(p.x()).to.be.equal(4);
    expect(p.y()).to.be.equal(6);
  });
  it("should move a point", () => {
    var p = new Point();
    p.x(2);
    p.y(3);
    p.move(2, 6);

    expect(p.x()).to.be.equal(4);
    expect(p.y()).to.be.equal(9);
  });
});
