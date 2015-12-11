/**
 * Check a value against a primitive type
 * @param  {*} value   Value to check against pattern
 * @param  {*} pattern Legacy primitive pattern to check with
 * @throws {Error} Value was not conform to pattern
 * @returns {undefined}
 */
checkForPrimitive = function checkForPrimitive(value, pattern) {
  if (value === null && pattern === null) {
    return;
  }

  if (
    // NOTE: Special case:
    // typeof null === 'object'
    // While this may seem logical in some way, the native behaviour of
    // check() is to throw when used like check(null, Object).
    // As such, check manually and throw for K.check(null, Object);
    !(pattern === Object && value === null)
    && typeof value === primitiveMap.get(pattern)
  ) {
    return;
  }

  throw buildCheckError(value, pattern);
};
