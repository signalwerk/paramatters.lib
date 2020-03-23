import chai, { expect } from "chai";
import chaiUuid from "chai-uuid";
import Point from "../../src/Point/Point";
import { uuidRegex } from "../../src/uuid";
import { PointType } from "../../src/Point/PointUtil";

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
    const p = new Point(220, 330);

    expect(p.x()).to.be.equal(220);
    expect(p.y()).to.be.equal(330);
  });

  it("should be able to set id if forced", () => {
    const p = new Point({ id: "1", forceId: true });
    expect(p.id()).to.be.equal("1");
  });

  it("should set all attributes when constructed with an object", () => {
    const p = new Point({
      type: PointType.line,
      x: 200,
      y: 300,
      id: "testid"
    });

    expect(p.type()).to.be.equal(PointType.line);
    expect(p.x()).to.be.equal(200);
    expect(p.y()).to.be.equal(300);
    expect(p.id()).not.to.be.equal("testid");
    expect(p.id()).to.be.a.uuid("v4");
  });

  it("should set all attributes by separate functions", () => {
    const p = new Point();

    p.type(PointType.line);
    p.x(2);
    p.y(3);

    expect(p.type()).to.be.equal(PointType.line);
    expect(p.x()).to.be.equal(2);
    expect(p.y()).to.be.equal(3);
    expect(p.id()).to.be.a.uuid("v4");
    // expect(p.print()).to.be.equal('name: test\ntype: line\nx: 2\ny: 3\nsmooth: true\nid: kä@k');
  });

  it("ID set is not allowed", () => {
    const p = new Point();

    expect(() => p.id("kä@k")).to.throw();
    expect(p.id()).not.to.be.equal("kä@k");
    expect(p.id()).to.be.a.uuid("v4");
  });

  it("should set scale a point", () => {
    const p = new Point();
    p.x(2);
    p.y(3);
    p.scale(2);

    expect(p.x()).to.be.equal(4);
    expect(p.y()).to.be.equal(6);
  });

  it("should move a point", () => {
    const p = new Point();
    p.x(2);
    p.y(3);
    p.move(2, 6);

    expect(p.x()).to.be.equal(4);
    expect(p.y()).to.be.equal(9);
  });

  it("should clone a point", () => {
    const p = new Point();

    p.type(PointType.line);
    p.x(2);
    p.y(3);

    const p2 = p.clone();

    expect(p.type()).to.be.equal(p2.type());
    expect(p.x()).to.be.equal(p2.x());
    expect(p.y()).to.be.equal(p2.y());
    expect(p.id()).not.to.be.equal(p2.id());
    expect(p2.id()).to.be.a.uuid("v4");
  });

  it("toJS returns data object", () => {
    const p = new Point({
      type: PointType.line,
      x: 200,
      y: 300
    }).toJS();

    expect({ ...p, id: "uuid" }).to.deep.equal({
      id: "uuid",
      type: "point",
      x: 200,
      y: 300,
      type: "line"
    });
  });

  it("toString is json", () => {
    const p = new Point({
      type: PointType.line,
      x: 200,
      y: 300
    });

    expect(`${p}`.replace(uuidRegex, "uuid")).to.be.equal(
      `{"id":"uuid","type":"point","x":200,"y":300,"type":"line"}`
    );
  });
});
