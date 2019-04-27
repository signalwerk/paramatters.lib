import chai, { expect } from "chai";
import chaiUuid from "chai-uuid";
import { PointType } from "../../src/Point/PointUtil";

chai.use(chaiUuid);

describe("PointStore", () => {
  it("test fixtures", () => {
    expect(PointType.none).to.be.equal(null);
    expect(PointType.move).to.be.equal("move");
    expect(PointType.line).to.be.equal("line");
    expect(PointType.offcurve).to.be.equal("offcurve");
    expect(PointType.curve).to.be.equal("curve");
    expect(PointType.qcurve).to.be.equal("qcurve");
  });
});
