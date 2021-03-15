import { Point, POINT_STYLE } from "../../src/Point/fPoint";
// import { Changeset } from "../../src/Changeset/fChangeset";
import React from "react";
import * as dependency from "../../src/uuid";

// var cs = Changeset.create()
//   .x(8)
//   .y(9)
//   .scale(21)
//
// const p1 = Point()
// const p2 = cs.apply(p1)

const constID = "id";
dependency.uuid = () => constID; //jest.fn(); // Mutate the named export

// jest.mock('shortid');

describe("Point", () => {
  it("should equal the default values on init", () => {
    const p = Point();
    expect(p).toEqual({
      element: "point",
      id: constID,
      x: 0,
      y: 0,
      type: POINT_STYLE.MOVE,
    });
  });

  it("should equal the init values on args-call", () => {
    const p = Point(3, 4, POINT_STYLE.LINE);
    expect(p).toEqual({
      element: "point",
      id: constID,
      x: 3,
      y: 4,
      type: POINT_STYLE.LINE,
    });
  });

  it("should equal the init values on obj-call", () => {
    const p = Point({
      id: "myID",
      x: 5,
      y: 6,
      type: POINT_STYLE.CLOSE,
    });

    expect(p).toEqual({
      element: "point",
      id: "myID",
      x: 5,
      y: 6,
      type: POINT_STYLE.CLOSE,
    });
  });

  it("should move points", () => {
    const p1 = Point({
      x: 5,
      y: 6,
    });
    const p2 = Point.move(3, 5)(p1);


    // const p2 = Changeset().point().move(3, 5).apply();
    // const p2 = Changeset().move(3, 5).apply(p1);
    // const p2 = Changeset(p1).move(3, 5).apply();


    expect(p2).toEqual({
      element: "point",
      id: constID,
      x: 8,
      y: 11,
      type: POINT_STYLE.MOVE,
    });
  });
});
