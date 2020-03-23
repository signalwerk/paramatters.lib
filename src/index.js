import pPoint from "./Point/Point";
import pContour from "./Contour/Contour";
import pSVGParser from "./Contour/SVGParser";
import pResolver from "./resolve";
import { contourToSvg } from "./Contour/ContourSvg";
import { PointType as pPointType } from "./Point/PointUtil";

const pRenderer = {
  ContourToSVG: contourToSvg
};
const Paramatters = {
  // render(n) {
  //   return `${dependency()} + ${n}`;
  // }
  Point: pPoint,
  Contour: pContour,
  SVGParser: pSVGParser,
  PointType: pPointType,
  Resolver: pResolver,
  Renderer: pRenderer
};
export default Paramatters;

export const Point = pPoint;
export const Contour = pContour;
export const PointType = pPointType;
export const Resolver = pResolver;
export const Renderer = pRenderer;
export const SVGParser = pSVGParser;
