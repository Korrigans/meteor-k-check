errorPrefix = '[K.check]';

const errorKey = 'Check';

K.ErrorLog.add(errorKey);

/** Error factory, generates a pretty error message
 * @private
 * @param  {*} value   Value to use when generating error
 * @param  {*} pattern Pattern to use when generating error
 * @return {Error}     Generated error
 */
buildCheckError = function buildCheckError(value, pattern) {
  const
    beautifiedPattern = beautifyPattern(pattern),
    beautifiedValue = beautifyValue(value);

  let errorMessage
      = `Expected ${beautifiedPattern}, got ${beautifiedValue}`;

  if (buildCheckError.path.length > 0) {
    const lastPath = buildCheckError.path.pop();

    errorMessage += ` at ${lastPath.direction}`;
    errorMessage += ` of ${beautifyValue(lastPath.of)}`;
    errorMessage += ` against ${beautifyPattern(lastPath.against)}`;
  }

  const logEntry = K.ErrorLog.log(errorKey, {
    message: errorMessage,
    path: _.map(buildCheckError.path, ({ direction, of, against }) =>
      `${direction} of ${beautifyValue(of)} against ${beautifyPattern(against)}`
    )
  });

  errorMessage
    = `${errorPrefix} ${errorMessage} (K.ErrorLog.Check[${logEntry}]).`;

  // Empty path
  while (buildCheckError.path.length > 0) {
    buildCheckError.path.pop();
  }

  return new Error(errorMessage);
};

/**
 * Array storing paths of each recursive layer of a pattern
 * It is populated by checkLegacyArray and checkLegacyObject which are the only
 * recursive patterns.
 * K.check removes path as they are validated
 * Finally, buildCheckError uses these paths to build a complete log and
 * subsequently clears this array.
 * @type {Array}
 */
buildCheckError.path = [];

K.Internals.check.buildCheckError = buildCheckError;
