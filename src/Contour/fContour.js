import React, { useState } from "react";
import get from "../util/get";
import { POINT_STYLE } from "../Point/fPoint";

export const Contour = (points) => {
  return {
    element: "contour",
    points: points || [],
  };
};

export const C = function (points) {
  let data = {
    points: points || [],
  };
  return {
    // then: function (func) {
    //   points = func(points);
    //   return this;
    // },
    add: function (data) {
      data = {
        ...data,
        points: [...data.points, data],
      };
      return this;
    },
    get: function () {
      return Contour(data.points);
    },
  };
};

export const SVGPath = (contour) => {
  const d = SVGD(contour.points);
  return <path d={d} />;
  //
  // stroke={PATH_PREFS.stroke}
  // strokeWidth={PATH_PREFS.strokeWidth}
  // fill={PATH_PREFS.fill}
};

export const SVGD = (points) => {
  const path = [];
  let offcurvePoints = [];
  points.forEach((point) => {
    switch (get(point, "type")) {
      case POINT_STYLE.MOVE:
        path.push(`M${get(point, "x")} ${get(point, "y")}`);
        offcurvePoints = [];
        break;
      case POINT_STYLE.OFFCURVE:
        offcurvePoints.push(`${get(point, "x")} ${get(point, "y")}`);
        break;
      case POINT_STYLE.CURVE:
        path.push(
          `C${offcurvePoints.join(", ")}, ${get(point, "x")} ${get(point, "y")}`
        );
        offcurvePoints = [];
        break;
      case POINT_STYLE.LINE:
        path.push(`L${get(point, "x")} ${get(point, "y")}`);
        offcurvePoints = [];
        break;
      case POINT_STYLE.CLOSE:
        path.push(`Z`);
        offcurvePoints = [];
        break;

      default:
        throw new Error(`render error of point-type: ${get(point, "type")}`);
    }
  });

  return path.join(" ");
};
