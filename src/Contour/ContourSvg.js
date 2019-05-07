export const svgToContour = svg => {
  throw new Error(`SVG interpreter not implemented righ now: ${svg}`);
};

// handle immutable and obj
const get = (obj, key) => obj[key] || obj.get(key);

export const contourToSvg = contour => {
  const path = [];
  let offcurvePoints = [];
  get(contour, "points").forEach(point => {
    switch (get(point, "type")) {
      case "move":
        path.push(`M${get(point, "x")} ${get(point, "y")}`);
        offcurvePoints = [];
        break;
      case "offcurve":
        offcurvePoints.push(`${get(point, "x")} ${get(point, "y")}`);
        break;
      case "curve":
        path.push(
          `C${offcurvePoints.join(", ")}, ${get(point, "x")} ${get(point, "y")}`
        );
        offcurvePoints = [];
        break;
      case "line":
        path.push(`L${get(point, "x")} ${get(point, "y")}`);
        offcurvePoints = [];
        break;
      default:
        throw new Error(`render error of point-type: ${get(point, "type")}`);
    }
  });

  if (get(contour, "closed")) {
    path.push(`Z`);
  }

  return path.join(" ");
};
