import Point from "../../src/point";

describe("point model", () => {
  describe("test fixtures", () => {
    expect(Point.pointType.none).to.be.equal("none");
    expect(Point.pointType.move).to.be.equal("move");
    expect(Point.pointType.line).to.be.equal("line");
    expect(Point.pointType.offcurve).to.be.equal("offcurve");
    expect(Point.pointType.curve).to.be.equal("curve");
    expect(Point.pointType.qcurve).to.be.equal("qcurve");
    expect(Point.pointType.anchor).to.be.equal("anchor");
  });

  describe("initialize", () => {
    it("should equal the default values on init", () => {
      var p = new Point();

      expect(p.name()).to.be.equal("");
      expect(p.type()).to.be.equal(Point.pointType.none);
      expect(p.x()).to.be.equal(0);
      expect(p.y()).to.be.equal(0);
      expect(p.id()).to.be.equal("");
    });

    it("should set x/y with two arguments on constructor", () => {
      var p = new Point(220, 330);

      expect(p.x()).to.be.equal(220);
      expect(p.y()).to.be.equal(330);
    });

    it("should set all attributes when constructed with an object", () => {
      var p = new Point({
        type: Point.pointType.line,
        x: 200,
        y: 300,
        id: "testid"
      });

      expect(p.type()).to.be.equal(Point.pointType.line);
      expect(p.x()).to.be.equal(200);
      expect(p.y()).to.be.equal(300);
      expect(p.id()).to.be.equal("testid");
    });
  });

  describe("set & get", () => {
    it("should set all attributes by separate functions", () => {
      var p = new Point();

      p.name("test");
      p.type(Point.pointType.line);
      p.x(2);
      p.y(3);
      p.id("kä@k");

      expect(p.name()).to.be.equal("test");
      expect(p.type()).to.be.equal(Point.pointType.line);
      expect(p.x()).to.be.equal(2);
      expect(p.y()).to.be.equal(3);
      expect(p.id()).to.be.equal("kä@k");
      // expect(p.print()).to.be.equal('name: test\ntype: line\nx: 2\ny: 3\nsmooth: true\nid: kä@k');
    });
  });

  describe("transformations", () => {
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
      p.move(2, 2);

      expect(p.x()).to.be.equal(4);
      expect(p.y()).to.be.equal(5);
    });
  });
  describe("events", () => {
    it("should clone a point", () => {
      var p = new Point();

      p.name("test");
      p.type(Point.pointType.line);
      p.x(2);
      p.y(3);
      p.id("kä@k");

      var p2 = p.clone();

      expect(p.name()).to.be.equal(p2.name());
      expect(p.type()).to.be.equal(p2.type());
      expect(p.x()).to.be.equal(p2.x());
      expect(p.y()).to.be.equal(p2.y());
      expect(p.id()).to.be.equal(p2.id());
    });
  });

  describe("events", () => {
    it("should fire events for properties", () => {
      var xCallback = 0;
      var generalCallback = 0;

      var p = new Point();

      p.on("change:x", function(val, point) {
        xCallback += 1;
      });

      p.on("change", function(val, point) {
        generalCallback += 10;
      });

      p.x(2);

      expect(xCallback).to.be.equal(1);
      expect(generalCallback).to.be.equal(10);
    });
  });
});
