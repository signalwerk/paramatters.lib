import chai, { expect } from "chai";
import chaiUuid from "chai-uuid";
import PointStore from "../src/PointStore";

chai.use(chaiUuid);

describe("PointStore", () => {
  it("test fixtures", () => {
    expect(PointStore.pointType.none).to.be.equal(null);
    expect(PointStore.pointType.move).to.be.equal("move");
    expect(PointStore.pointType.line).to.be.equal("line");
    expect(PointStore.pointType.offcurve).to.be.equal("offcurve");
    expect(PointStore.pointType.curve).to.be.equal("curve");
    expect(PointStore.pointType.qcurve).to.be.equal("qcurve");
  });
});
