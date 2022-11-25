import Font from "../../src/Font";
import Glyph from "../../src/glyph";
import Contour from "../../src/contour";
import Point from "../../src/point";

describe("glyph model", () => {
  describe("initialize", () => {
    it("should equal the default values on init", () => {
      var f = new Font();

      expect(f.id()).to.be.equal("");
      expect(f.name()).to.be.equal("");
    });

    it("should set name with one arguments on constructor", () => {
      var f = new Font("ShortHandInitName");

      expect(f.name()).to.be.equal("ShortHandInitName");
    });

    it("should set all attributes when constructed with an object", () => {
      var f = new Font({
        id: "testid",
        name: "TestFont"
      });

      expect(f.id()).to.be.equal("testid");
      expect(f.name()).to.be.equal("TestFont");
    });
  });

  describe("set & get", () => {
    it("should set all attributes by separate functions", () => {
      var f = new Font();

      f.id("testid");
      f.name("test");

      expect(f.id()).to.be.equal("testid");
      expect(f.name()).to.be.equal("test");
    });
  });

  describe("child handling", () => {
    var glyph = null;

    before(function() {
      glyph = new Glyph();
      glyph.name("a");
      glyph.unicode("a");

      contour = new Contour();
      contour.name("rect");

      var p1 = new Point();
      p1.x(1);
      p1.y(10);
      p1.name("point 1");

      var p2 = new Point();
      p2.x(2);
      p2.y(20);
      p2.name("point 2");

      var p3 = new Point();
      p3.x(3);
      p3.y(30);
      p3.name("point 3");

      var p4 = new Point();
      p4.x(4);
      p4.y(40);
      p4.name("point 4");

      contour.points.append(p1);
      contour.points.append(p2);
      contour.points.append(p3);
      contour.points.append(p4);

      glyph.contours.append(contour);
    });

    describe("anchor handling", () => {
      it("should append glyph to font", () => {
        var f = new Font();

        expect(f.glyphs.length()).to.be.equal(0);
        f.glyphs.append(glyph.clone());
        expect(f.glyphs.length()).to.be.equal(1);
      });

      it("should read last glyph of font", () => {
        var f = new Font();
        f.glyphs.append(glyph.clone());

        expect(
          f.glyphs
            .last()
            .contours.last()
            .points.last()
            .x()
        ).to.be.equal(4);
        expect(
          f.glyphs
            .last()
            .contours.last()
            .points.last()
            .y()
        ).to.be.equal(40);
      });

      it("should read glyph by index", () => {
        var f = new Font();
        f.glyphs.append(glyph.clone());

        expect(
          f.glyphs
            .get(0)
            .contours.last()
            .points.last()
            .x()
        ).to.be.equal(4);
        expect(
          f.glyphs
            .get(0)
            .contours.last()
            .points.last()
            .y()
        ).to.be.equal(40);
      });
    });

    describe("transformations", () => {
      it("should set scale a font", () => {
        var f = new Font();
        f.glyphs.append(glyph.clone());

        f.scale(2);

        expect(
          f.glyphs
            .last()
            .contours.last()
            .points.last()
            .x()
        ).to.be.equal(8);
        expect(
          f.glyphs
            .last()
            .contours.last()
            .points.last()
            .y()
        ).to.be.equal(80);
      });
      it("should move a point", () => {
        var f = new Font();
        f.glyphs.append(glyph.clone());

        f.move(2, 2);

        expect(
          f.glyphs
            .last()
            .contours.get(0)
            .points.last()
            .x()
        ).to.be.equal(6);
        expect(
          f.glyphs
            .last()
            .contours.get(0)
            .points.last()
            .y()
        ).to.be.equal(42);
      });
    });

    describe("events", () => {
      it("should clone a font", () => {
        var f = new Font();
        f.glyphs.append(glyph.clone());

        f.id("kä@k");
        f.name("test");

        var f2 = f.clone();

        expect(f.id()).to.be.equal(f2.id());
        expect(f.name()).to.be.equal(f2.name());
        expect(f.glyphs.length()).to.be.equal(f2.glyphs.length());
      });
    });
  });
});
