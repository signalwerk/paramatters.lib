import Anchor from "../../src/anchor";

// Tests are also done by point

describe("anchor model", () => {
  describe("initialize", () => {
    it("should equal the default values on init", () => {
      var a = new Anchor();

      expect(a.name()).to.be.equal("");
      expect(a.type()).to.be.equal(Anchor.pointType.anchor);
      expect(a.x()).to.be.equal(0);
      expect(a.y()).to.be.equal(0);
      expect(a.id()).to.be.equal("");
    });

    it("should set x/y with two arguments on constructor", () => {
      var a = new Anchor(220, 330);

      expect(a.x()).to.be.equal(220);
      expect(a.y()).to.be.equal(330);
    });

    it("should set all attributes when constructed with an object", () => {
      var a = new Anchor({
        name: "test",
        type: Anchor.pointType.anchor,
        x: 200,
        y: 300,
        id: "testid"
      });

      expect(a.name()).to.be.equal("test");
      expect(a.type()).to.be.equal(Anchor.pointType.anchor);
      expect(a.x()).to.be.equal(200);
      expect(a.y()).to.be.equal(300);
      expect(a.id()).to.be.equal("testid");
    });
  });
});
