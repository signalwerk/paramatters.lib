import React, { Fragment } from "react";

export const Polygon = ({ data }) => {
  return (
    <Fragment>
      <polygon
        stroke={data.stroke}
        strokeWidth={data.strokeWidth}
        fill={data.fill}
        points={data.points.map(p => p.join(",")).join(" ")}
      />
    </Fragment>
  );
};
