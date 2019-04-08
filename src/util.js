const clone = function(original) {
  const duplicate = {};
  const keys = Object.keys(original);
  for (const key in keys) {
    duplicate[key] = original[key];
  }
  return duplicate;
};

export default clone;
