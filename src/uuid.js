
// https://gist.github.com/bugventure/f71337e3927c34132b9a
export const uuidRegex = /[A-F\d]{8}-[A-F\d]{4}-4[A-F\d]{3}-[89AB][A-F\d]{3}-[A-F\d]{12}/i;

// https://gist.github.com/jed/982883
// this can be any function that returns a string
export const uuid = a => {
  return a
    ? (a ^ ((Math.random() * 16) >> (a / 4))).toString(16)
    : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid);
};
