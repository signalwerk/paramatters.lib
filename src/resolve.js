const resolveItem = (candidate, store) => {
  if (candidate.get("type") === "point") {
    return store.data.getIn(["points", candidate.get("id")]);
  }

  if (candidate.get("type") === "contour") {
    return candidate.merge({
      points: candidate.get("points").map(item => {
        return resolveItem(item, store);
      })
    });
  }
  if (candidate.get("type") === "store") {
    return candidate.merge({
      contours: candidate.get("contours").map(item => {
        return resolveItem(item, store);
      })
    });
  }
  return null;
};

// const resolve = (contour, store) => {
//   return contour.merge({
//     points: contour.get("points").map(item => {
//       return store.data.getIn(["points", item]);
//     })
//   });
// };

export default resolveItem;
