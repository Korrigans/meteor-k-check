checkCustomFunction = function checkCustomFunction(value, pattern) {
  const testFunc = pattern[K.check.custom];

  if (!_.isFunction(testFunc)) {
    throw new Error(
      `${errorPrefix} Expected custom function to be a function, `
      + `got ${typeof testFunc}`
    );
  }

  let error = null;

  try {
    pattern[K.check.custom](value);
  }
  catch (e) {
    error = e;
  }

  if (error !== null) {
    throw buildCheckError(
      value,
      `custom pattern ${beautifyPattern(testFunc)}`,
      `(error : ${error.message})`
    );
  }

  buildCheckError.path.push({
    direction: `custom validation`,
    of: value,
    against: beautifyPattern(pattern)
  });
};

if (K.debug && K.debug === true) {
  K.Internals.check.checkCustomFunction = checkCustomFunction;
}
