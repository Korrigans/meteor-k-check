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


  // There is still some elements in the path, log it and notify user
  if (buildCheckError.path.length > 0) {
    // In buildCheckError.path each path is stored as a direction, a value,
    // and a pattern. We need to build some kind of stack trace from these values.
    const logEntry = K.ErrorLog.log(errorKey, {
      message: errorMessage,
      path: buildCheckError.path.map(({ direction, of, against }) =>
        `${direction} of ${beautifyValue(of)} against ${beautifyPattern(against)}`
      )
    });

    errorMessage += ` (K.ErrorLog.Check[${logEntry}])`;
  }

  // Add prettiness ----------------------------v
  errorMessage = `${errorPrefix} ${errorMessage}.`;

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

buildCheckError.path.removeLast = () => {
  const lastElem = _.last(buildCheckError.path);

  if (lastElem && !lastElem.locked) {
    buildCheckError.path.pop();
  }
};

buildCheckError.path.lock = () => {
  const elemToLock = _.last(buildCheckError.path);

  if (!elemToLock) {
    throw new Error('corrupted path: path empty, can not lock');
  }
  if (elemToLock.locked) {
    throw new Error('corrupted path: tried to overlock an element');
  }

  elemToLock.locked = true;
};

buildCheckError.path.unlock = () => {
  if (buildCheckError.path.length === 0) {
    throw new Error('corrupted path: path empty, can not unlock');
  }
  const elemToUnlock = _.findLast(buildCheckError.path, elem => elem.locked);

  if (!elemToUnlock) {
    throw new Error('corrupted path: could not find any locked element');
  }

  delete elemToUnlock.locked;
};

const notEnumerable = { enumerable: false };

Object.defineProperties(buildCheckError.path, {
  lock: notEnumerable,
  unlock: notEnumerable,
  removeLast: notEnumerable
});

if (K.debug && K.debug === true) {
  K.Internals.check.buildCheckError = buildCheckError;
}
