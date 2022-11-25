import fontcat from "../../src/fontcat";

describe("fontcat", () => {
  describe("Greet function", () => {
    beforeEach(() => {
      spy(fontcat, "greet");
      fontcat.greet();
    });

    it("should have been run once", () => {
      expect(fontcat.greet).to.have.been.calledOnce;
    });

    it("should have always returned hello", () => {
      expect(fontcat.greet).to.have.always.returned("hello");
    });
  });
});
