/**
 * Checks an exact value against another one
 * @param  {(Number|Boolean|String)} value   Primitive value to check
 * @param  {(Number|Boolean|String)} pattern Primitive pattern to check against
 * @memberof Patterns
 * @throws {Error}                           Value was not conform to pattern
 * @return {undefined}
 */
Patterns.checkForExactValues = function checkForExactValues(value, pattern) {
  if (value !== pattern) {
    throw buildCheckError(value, pattern);
  }
};
