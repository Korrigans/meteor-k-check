primitiveMap = new Map();

// NOTE: These first values are used to test against the typeof operator
primitiveMap.set(Boolean, 'boolean');
primitiveMap.set(Number, 'number');
primitiveMap.set(String, 'string');
primitiveMap.set(Function, 'function');
primitiveMap.set(Object, 'object');
// NOTE: These two last values are only used for beautification purposes
primitiveMap.set(undefined, 'undefined');
primitiveMap.set(null, 'null');

errorPrefix = '[K.check]';

// NOTE: Define beautifyPattern and beautifyValue on K?
/**
 * Turn a pattern into an elegant string
 * @private
 * @param  {*} pattern Pattern to turn to string
 * @return {String}    Elegant string
 */
beautifyPattern = function beautifyPattern(pattern) {
  // Legacy primitive patterns
  if (primitiveMap.has(pattern)) {
    return `${primitiveMap.get(pattern)}`;
  }
  // Legacy constructor pattern
  if (_.isFunction(pattern)) {
    return pattern.name ? `function ${pattern.name}` : 'anonymous function';
  }
  // Legacy array pattern
  if (_.isArray(pattern)) {
    return `[${beautifyPattern(pattern[0])}]`;
  }
  // Legacy Match.OneOf pattern
  if (_.isArray(pattern.choices)) {
    return `Match.OneOf(${
      _.reduce(pattern.choices,
        (accu, entry) => `${accu}, ${beautifyPattern(entry)}`,
        ''
      // Remove leading ', '
      ).slice(2)
    })`;
  }
  if (_.isObject(pattern)) {
    return `{ ${
      _.reduce(_.keys(pattern),
        (accu, key) => `${accu}, ${key}: ${beautifyPattern(pattern[key])}`,
        ''
      // Remove leading ', '
    ).slice(2)
    } }`;
  }

  return pattern;
};

/**
 * Turn a value into an elegant string
 * @private
 * @param  {*} value Value to turn into a string
 * @return {String}  Elegant string
 */
beautifyValue = function beautifyValue(value) {
  if (_.isString(value)) {
    return `"${value}"`;
  }
  if (_.isArray(value)) {
    return `[${_.reduce(value,
      (accu, entry) => `${accu}, ${beautifyValue(entry)}`,
      ''
    ).slice(2)}]`;
  }
  if (_.isFunction(value)) {
    return value.name ? `function ${value.name}` : 'anonymous function';
  }
  if (_.isObject(value)) {
    return `{ ${
      _.reduce(_.keys(value),
        (accu, key) => `${accu}, ${key}: ${beautifyValue(value[key])}`,
        ''
      // Remove leading ', '
      ).slice(2)
    } }`;
  }

  // Use safe lodash toString
  return _(value).toString();
};

/**
 * Error factory, generates a pretty error message
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
