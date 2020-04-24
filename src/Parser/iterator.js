// itterator basics
export const advance = iterator => (iterator.index = iterator.index + 1);

export const length = ({ load }) => load.length;

export const current = iterator => {
  if (iterator.index >= length(iterator)) {
    return { type: "eof" };
  }
  return iterator.access(iterator.index);
};

export const consume = iterator => {
  if (iterator.index >= length(iterator)) {
    return { type: "eof" };
  }
  let val = iterator.load[iterator.index];
  advance(iterator);
  return val;
};

export const match = (iterator, matcher) => {
  if (iterator.match(current(iterator)) === matcher) {
    let val = current(iterator);
    advance(iterator);
    return val;
  } else if (iterator.index >= length(iterator))
    throw new Error("Pointer went beyond the end of the load.");
  else
    throw new Error(
      `Unexpected '${iterator.match(
        current(iterator)
      )}'. Expected '${matcher}'.`
    );
};
