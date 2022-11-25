const isNum = v => {
  return !isNaN(parseFloat(v)) && isFinite(v);
};

const isAlpha = v => {
  const regExp = new RegExp(/^[a-z0-9]+$/i);
  return regExp.test(v);
};

exports.isNum = isNum;
exports.isAlpha = isAlpha;
