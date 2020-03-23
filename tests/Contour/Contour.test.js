import chai, { expect } from "chai";
import chaiUuid from "chai-uuid";
import Contour from "../../src/Contour/Contour";
import { PointType } from "../../src/Point/PointUtil";
import { uuidRegex } from "../../src/uuid";
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

  it("should close path with close()", () => {
    const c = new Contour().close();
    expect(c.closed()).to.be.equal(true);
  });

  describe("set & get", () => {
    it("should set all attributes by separate functions", () => {
      const c = new Contour();

      c.closed(true);

      expect(c.closed()).to.be.equal(true);
    });

    it("should be able to set id if forced", () => {
      const c = new Contour({ id: "1", forceId: true });
      expect(c.id()).to.be.equal("1");
    });
  });

  describe("child handling", () => {
    it("should append point to contour", () => {
      const c = new Contour();
      const p = new Point();

      expect(c.points.get().size).to.be.equal(0);
      c.points.push(p);
      expect(c.points.get().size).to.be.equal(1);
    });

    it("should read last point of contour", () => {
      const c = new Contour();
      const p = new Point(10, 20);
      c.points.push(p);

      expect(c.points.last().x()).to.be.equal(10);
      expect(c.points.last().y()).to.be.equal(20);
    });

    it("should create only the point in one store", () => {
      const c = new Contour();
      expect(c.points.size).to.be.equal(0);

      c.points.push(new Point(0, 0).type(PointType.move));

      expect(c.points.size).to.be.equal(1);
      c.points.push(new Point(10, 0).type(PointType.line));
      expect(c.points.size).to.be.equal(2);
      c.points.push(new Point(10, 10).type(PointType.line));
      expect(c.points.size).to.be.equal(3);
      c.points.push(new Point(0, 10).type(PointType.line));
      expect(c.points.size).to.be.equal(4);
    });

    it("should read point by index", () => {
      const c = new Contour();
      const p1 = new Point(10, 20);
      const p2 = new Point(15, 25);
      c.points.push(p1);
      c.points.push(p2);

      expect(c.points.get(0).x()).to.be.equal(10);
      expect(c.points.get(0).y()).to.be.equal(20);
      expect(c.points.get(1).x()).to.be.equal(15);
      expect(c.points.get(1).y()).to.be.equal(25);
    });

    it("should write point by index", () => {
      const c = new Contour();
      const p1 = new Point(10, 20);
      const p2 = new Point(15, 25);
      c.points.push(p1);
      c.points.push(p2);
      p1.x(12);

      c.points.get(1).x(17);
      expect(c.points.get(0).x()).to.be.equal(12);
      expect(c.points.get(0).y()).to.be.equal(20);
      expect(c.points.get(1).x()).to.be.equal(17);
      expect(c.points.get(1).y()).to.be.equal(25);
    });
  });

  it("toJS returns data object", () => {
    const c = new Contour({
      closed: true
    });
    const p = new Point({
      type: PointType.line,
      x: 200,
      y: 300
    });
    c.points.push(p);

    const cObj = c.toJS();

    expect({
      ...cObj,
      points: cObj.points.map(item => ({ ...item, id: "uuid" })),
      id: "uuid"
    }).to.deep.equal({
      id: "uuid",
      __type: "contour",
      closed: true,
      points: [
        {
          id: "uuid",
          __type: "point",
          x: 200,
          y: 300,
          type: "line"
        }
      ]
    });
  });

  it("toString is json", () => {
    const c = new Contour({
      closed: true
    });
    const p = new Point({
      type: PointType.line,
      x: 200,
      y: 300
    });
    c.points.push(p);

    expect(`${c}`.replace(uuidRegex, "uuid")).to.be.equal(
      `{"id":"uuid","__type":"contour","closed":true,"points":[{"id":"uuid","__type":"point","x":200,"y":300,"type":"line"}]}`
    );
  });
});
