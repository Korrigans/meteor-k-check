errorPrefix = '[K.check]';

const errorKey = 'Check';

K.ErrorLog.add(errorKey);

/** Error factory, generates a pretty error message
 * @private
 * @param  {*}      value          Value to use when generating error
 * @param  {*}      pattern        Pattern to use when generating error
 * @param  {String} [optMessage=]  Optional message to include
 * @return {Error}                 Generated error
 */
buildCheckError = function buildCheckError(value, pattern, optMessage) {
  const
    beautifiedPattern = beautifyPattern(pattern),
    beautifiedValue = beautifyValue(value);

  // Build core message
  let errorMessage
      = `Expected ${beautifiedPattern}, got ${beautifiedValue}`;

  if (optMessage) {
    errorMessage += ` ${optMessage}`;
  }

  // If path is found, fetch the last element and append it to error
  if (buildCheckError.path.length > 0) {
    const lastPath = buildCheckError.path.pop();

    errorMessage += ` at ${lastPath.direction}`;
    errorMessage += ` of ${beautifyValue(lastPath.of)}`;
    errorMessage += ` against ${beautifyPattern(lastPath.against)}`;
  }

  // In buildCheckError.path each path is stored as a direction, a value,
  // and a pattern. We need to build some kind of stack trace from these values.
  const logEntry = K.ErrorLog.log(errorKey, {
    message: errorMessage,
    path: _.map(buildCheckError.path, ({ direction, of, against }) =>
      `${direction} of ${beautifyValue(of)} against ${beautifyPattern(against)}`
    )
  });

  // Finally, prefix the error with the and suffix
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
 * @type {{
 *   direction: String,
 *   value: Object,
 *   pattern: Object
 * }[]}
 * @example
 * buildCheckError.path.push({
 *    direction : 'key bar',
 *    value : { bar : 'bar value' },
 *    pattern : { bar : String }
 * });
 */
buildCheckError.path = [];

K.Internals.check.buildCheckError = buildCheckError;
