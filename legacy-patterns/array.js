/**
 * Check value against legacy pattern
 * @param  {*} value   Value to check
 * @param  {*[]} pattern Legacy array pattern, like [String]
 * @throws {Error}  Value was not conform to pattern
 * @returns {undefined}
 */
checkLegacyArray = function checkLegacyArray(value, pattern) {
  if (pattern.length > 1) {
    throw new Error(
      `${errorPrefix} Legacy check array patterns allow only one element!`
    );
  }
  if (!_.isArray(value)) {
    throw buildCheckError(value, pattern);
  }

  for (let entry of value) {
    K.check(entry, pattern[0]);
  }
};
