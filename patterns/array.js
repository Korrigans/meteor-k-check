/**
 * Check value against legacy pattern.
 * This pattern is recursive, so it populates buildCheckError.path with
 * current index, of current array value, against current pattern
 * @param  {*} value   Value to check
 * @param  {*[]} pattern Legacy array pattern, like [String]
 * @memberof Patterns
 * @throws {Error}  Value was not conform to pattern
 * @returns {undefined}
 */
Patterns.checkLegacyArray = function checkLegacyArray(value, pattern) {
  if (pattern.length > 1) {
    throw new Error(
      `${errorPrefix} Legacy check array patterns allow only one element!`
    );
  }
  if (!_.isArray(value)) {
    throw buildCheckError(value, pattern);
  }

  for (let index in value) {
    if (value.hasOwnProperty(index)) {
      buildCheckError.path.push({
        direction: `index ${index}`,
        of: value,
        against: pattern
      });
      K.check(value[index], pattern[0]);
    }
  }
};
