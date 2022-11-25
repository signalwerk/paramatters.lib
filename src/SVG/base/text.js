import React, { Fragment } from "react";

const asOutline = true;

const textAsOutline = (
  { x, y, fontSize, textAnchor, text, fill },
  fontRenderer
) => {
  const options = {
    x,
    y,
    fontSize,
    anchor: textAnchor
  };
  let svgD = fontRenderer.getD(`${text}`, options);

  return <path fill={fill} d={svgD} />;
};

export const Text = ({ data }, fontRenderer) => {
  return (
    <Fragment>
      {asOutline ? (
        textAsOutline(
          {
            x: data.x,
            y: data.y,
            fontSize: data.fontSize,
            textAnchor: data.textAnchor,
            text: data.text,
            fill: data.fill
          },
          fontRenderer
        )
      ) : (
        <text
          x={data.x}
          y={data.y}
          fill={data.fill}
          fontSize={data.fontSize}
          fontFamily={data.fontFamily}
          textAnchor={data.textAnchor}
        >
          {data.text}
        </text>
      )}
    </Fragment>
  );
};
