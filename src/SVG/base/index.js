import React, { Fragment } from "react";
import { Line } from "./line";
import { Text } from "./text";
import { Circle } from "./circle";
import { Polygon } from "./polygon";
import { Contour } from "./contour";
import { Group } from "./group";
import get from "../../util/get";

let Render = ({ data }, fontRenderer) => {
  return data.map(item => {
    return (
      <Fragment key={get(item, "id")}>
        {get(item, "type") === "circle" && Circle({ data: item.attributes })}
        {get(item, "type") === "polygon" && Polygon({ data: item.attributes })}
        {get(item, "type") === "contour" && Contour({ data: item })}
        {get(item, "type") === "line" && Line({ data: item.attributes })}
        {get(item, "type") === "group" &&
          Group({ data: item.attributes }, fontRenderer)}
        {get(item, "type") === "text" &&
          fontRenderer &&
          Text({ data: item.attributes }, fontRenderer)}
      </Fragment>
    );
  });
};

export default Render;
