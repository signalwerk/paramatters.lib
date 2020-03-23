import React, { Fragment } from "react";

export const Circle = ({ data }) => {
  return (
    <Fragment>
      <circle
        cx={data.cx || 0}
        cy={data.cy || 0}
        r={data.r || 1}
        stroke={data.stroke || "none"}
        strokeWidth={data.strokeWidth || 0}
        fill={data.fill || "black"}
      />
    </Fragment>
  );
};
