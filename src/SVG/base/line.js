import React, { Fragment } from "react";

const asOutline = true;

export const Line = ({ data }) => {
  let renderAsBox = false;

  let boxDimension;

  if (asOutline === true) {
    if (data.x1 === data.x2) {
      renderAsBox = true;
      boxDimension = {
        x: data.x1 - data.strokeWidth / 2,
        y: data.y1,
        width: data.strokeWidth,
        height: data.y2 - data.y1
      };
    }
  }

  return (
    <Fragment>
      {renderAsBox ? (
        <rect
          x={boxDimension.x}
          y={boxDimension.y}
          width={boxDimension.width}
          height={boxDimension.height}
          fill={data.stroke}
        />
      ) : (
        <line
          x1={data.x1}
          y1={data.y1}
          x2={data.x2}
          y2={data.y2}
          stroke={data.stroke}
          strokeWidth={data.strokeWidth}
        />
      )}
    </Fragment>
  );
};
