import React, { Fragment } from "react";
import { Renderer } from "paramatters.lib";

const PATH_PREFS = {
  stroke: "black",
  strokeWidth:3,
  fill: "none"
};

export const Contour = ({ data }) => {
  return (
    <Fragment>
      <path
        stroke={PATH_PREFS.stroke}
        strokeWidth={PATH_PREFS.strokeWidth}
        fill={PATH_PREFS.fill}
        d={Renderer.ContourToSVG(data)}
      />
    </Fragment>
  );
};
