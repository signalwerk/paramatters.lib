export const svgToContour = svg => {
  throw new Error(`SVG interpreter not implemented righ now: ${svg}`);
};

export const contourToSvg = contour => {
  const path = [];
  let offcurvePoints = [];
  contour.points.forEach(point => {
    switch (point.type) {
      case "move":
        path.push(`M${point.x} ${point.y}`);
        offcurvePoints = [];
        break;
      case "offcurve":
        offcurvePoints.push(`${point.x} ${point.y}`);
        break;
      case "curve":
        path.push(`C${offcurvePoints.join(", ")}, ${point.x} ${point.y}`);
        offcurvePoints = [];
        break;
      case "line":
        path.push(`L${point.x} ${point.y}`);
        offcurvePoints = [];
        break;
      default:
        throw new Error(`render error of point-type: ${point.type}`);
    }
  });

  if (contour.closed) {
    path.push(`Z`);
  }

  return path.join(" ");
};
