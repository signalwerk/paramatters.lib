// import chai, { expect } from "chai";
// import chaiUuid from "chai-uuid";
import { Contour } from "../../src/Contour/fContour";
// import { uuidRegex } from "../../src/uuid";
// // import Point from "../../src/Point/Point";
//
// const last = (arr) => arr[arr.length - 1];
//
// chai.use(chaiUuid);
//
// describe("Contour", () => {
//   it("should equal the default values on init", () => {
//     const c = Contour();
//     const { uuid, ...cObj } = c;
//     expect(cObj).to.deep.equal({
//       element: "contour",
//       points: [],
//     });
//     expect(cObj).to.deep.equal({
//       element: "contour",
//       points: [],
//     });
//
//   });
// });

import React from "react";
import * as dependency from "../../src/uuid";

const constID = "id";
dependency.uuid = () => constID; //jest.fn(); // Mutate the named export

// jest.mock('shortid');

describe("Contour", () => {
  it("should equal the default values on init", () => {

    const c = Contour();
    expect(c).toEqual({
      element: "contour",
      id: constID,
      points: [],
    });
  });
});
