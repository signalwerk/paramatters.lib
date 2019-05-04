const resolveItem = (candidate, store) => {
  if (candidate.get("__type") === "point") {
    return store.data.getIn(["points", candidate.get("id")]);
  }

  if (candidate.get("__type") === "contour") {
    return candidate.merge({
      points: candidate.get("points").map(item => {
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
