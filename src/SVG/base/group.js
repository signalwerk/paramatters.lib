import React, { Fragment } from "react";
import Render from "./";
import {
  compose,
  fromDefinition,
  identity,
  toSVG
} from "transformation-matrix";

// <g transform={`translate(${captionX},${y}) rotate(-90,0,0)`}>

export const Group = ({ data }, fontRenderer) => {
  let transformations = data.transformations.map(item => {
    switch (item.type) {
      case "translate":
        return {
          type: "translate",
          tx: item.attributes.x || 0,
          ty: item.attributes.y || 0
        };
      case "rotate":
        return {
          type: "rotate",
          angle: item.attributes.angle || 0,
          cx: item.attributes.x || 0,
          cy: item.attributes.y || 0
        };
      case "scale":
        return {
          type: "scale",
          sx: item.attributes.x || 1,
          sy: item.attributes.y || 1
        };
      default:
        return {};
    }
  });

  let matrix = compose(
    identity(),
    ...fromDefinition(transformations)
  );

  return (
    <Fragment>
      <g transform={`${toSVG(matrix)}`}>
        {Render({ data: data.children }, fontRenderer)}
      </g>
    </Fragment>
  );
};
