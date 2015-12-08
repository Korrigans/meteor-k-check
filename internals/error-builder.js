errorPrefix = '[K.check]';

/** Error factory, generates a pretty error message
 * @private
 * @param  {*} value   Value to use when generating error
 * @param  {*} pattern Pattern to use when generating error
 * @return {Error}     Generated error
 */
buildCheckError = function buildCheckError(value, pattern) {
  const
    beautifiedPattern = beautifyPattern(pattern),
    beautifiedValue = beautifyValue(value),
    errorMessage
      = `${errorPrefix} Expected ${beautifiedPattern}, got ${beautifiedValue}.`;

  return new Error(errorMessage);
};
