/**
 * Checks an exact value against another one
 * @param  {(Number|Boolean|String)} value   Primitive value to check
 * @param  {(Number|Boolean|String)} pattern Primitive pattern to check against
 * @throws {Error}                           Value was not conform to pattern
 * @return {undefined}
 */
checkForExactValues = function checkForExactValues(value, pattern) {
  if (value !== pattern) {
    throw buildCheckError(value, pattern);
  }
};

if (K.debug && K.debug === true) {
  K.Internals.check.checkForExactValues = checkForExactValues;
}
