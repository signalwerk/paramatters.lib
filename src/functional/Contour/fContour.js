import { uuid } from "../../uuid";
import { Overload } from "../../util/overload";

export const Contour = (...args) => {
  let { points } = Overload(["points"], args);

  return {
    element: "contour",
    id: uuid(),
    points: points || [],
  };
};
