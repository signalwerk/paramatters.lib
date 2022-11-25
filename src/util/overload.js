// if (arguments.length !== 1 || typeof arguments[0] !== "object") {
//   return this._call({
//     x: arguments[0],
//     y: arguments[1],
//     type: arguments[2],
//   });
// }

export const Overload = (props, args) => {
  if (args.length === 1 && typeof args[0] === "object") {
    return args[0];
  }

  return props.reduce(
    (accumulator, currentValue, index) => ({
      ...accumulator,
      [currentValue]: args[index],
    }),
    {}
  );
};
