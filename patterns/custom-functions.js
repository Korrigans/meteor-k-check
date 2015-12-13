/**
 * Check a value against a custom pattern
 * @param  {*} value                                Value to check
 * @param  {{ [K.check.custom]: Function }} pattern Custom pattern
 * @throws {Error} Custom pattern validator was not a function
 * @throws {Error} Custom pattern threw an error
 * @return {undefined}
 */
checkCustomFunction = function checkCustomFunction(value, pattern) {
  if (!_.isFunction(pattern[K.check.custom])) {
    throw new Error(
      `${errorPrefix} Expected custom function to be a function, `
      + `got ${typeof pattern[K.check.custom]}`
    );
  }

  buildCheckError.path.push({
    direction: `custom validation`,
    of: value,
    against: beautifyPattern(pattern)
  });

  buildCheckError.path.lock();

  let error = null, throwed = false;

  try {
    pattern[K.check.custom](value);
  }
  catch (e) {
    error = e;
    throwed = true;
  }

  buildCheckError.path.unlock();

  if (throwed) {
    throw buildCheckError(
      value,
      `custom pattern ${beautifyPattern(pattern[K.check.custom])}`,
      `(error : ${error.message})`
    );
  }
};

if (K.debug && K.debug === true) {
  K.Internals.check.checkCustomFunction = checkCustomFunction;
}
