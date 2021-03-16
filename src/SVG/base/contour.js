import React, { Fragment } from "react";
import { Renderer } from "../../";
import get from "../../util/get";
import { Circle } from "./circle";

const PATH_PREFS = {
  stroke: "black",
  strokeWidth: 3,
  fill: "none",
};

export const Contour = ({ data, dispatch }) => {
  return (
    <Fragment>
      <path
        stroke={PATH_PREFS.stroke}
        strokeWidth={PATH_PREFS.strokeWidth}
        fill={PATH_PREFS.fill}
        d={Renderer.ContourToSVG(data)}
      />

      {get(data, "points").map((point) => {
        // case "offcurve":
        //   offcurvePoints.push(`${get(point, "x")} ${get(point, "y")}`);
        //   break;
        // case "curve":
        //   path.push(
        //     `C${offcurvePoints.join(", ")}, ${get(point, "x")} ${get(point, "y")}`
        //   );
        //   offcurvePoints = [];
        //   break;

        switch (get(point, "type")) {
          case "move":
            return (
              <Circle
                data={{
                  cx: get(point, "x"),
                  cy: get(point, "y"),
                  r: 6,
                  fill: get(point, "selected") ? "red" : "green",
                }}
                fill={get(point, "selected") ? "red" : "green"}
                onClick={(e) => {
                  console.log("click", get(point, "id"));
                  dispatch({
                    type: "SELECT_POINTS",
                    payload: {
                      ids: [get(point, "id")],
                    },
                  });
                }}
              />
            );
          case "line":
            return (
              <Circle
                data={{
                  cx: get(point, "x"),
                  cy: get(point, "y"),
                  r: 6,
                  fill: get(point, "selected") ? "red" : "green",
                }}
                onClick={(e) => {
                  console.log("click", get(point, "id"));
                  dispatch({
                    type: "SELECT_POINTS",
                    payload: {
                      ids: [get(point, "id")],
                    },
                  });
                }}
              />
            );
          default:
            return false;
        }
      })}
    </Fragment>
  );
};
