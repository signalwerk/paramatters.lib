import React, { Fragment } from "react";
import { Line } from "./line";
import { Text } from "./text";
import { Circle } from "./circle";
import { Polygon } from "./polygon";
import { Contour } from "./contour";
import { Group } from "./group";

let Render = ({ data }, fontRenderer) => {
  return data.map(item => {
    return (
      <Fragment>
        {item.type === "circle" && Circle({ data: item.attributes })}
        {item.type === "polygon" && Polygon({ data: item.attributes })}
        {item.type === "contour" && Contour({ data: item })}
        {item.type === "line" && Line({ data: item.attributes })}
        {item.type === "group" &&
          Group({ data: item.attributes }, fontRenderer)}
        {item.type === "text" &&
          fontRenderer &&
          Text({ data: item.attributes }, fontRenderer)}
      </Fragment>
    );
  });
};

export default Render;
