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
    let message = `{ ${
      _.reduce(_.keys(pattern),
        (accu, key) => `${accu}, ${key}: ${beautifyPattern(pattern[key])}`,
        ''
      // Remove leading ', '
    ).slice(2)
    } }`;

    if (pattern[K.check.custom]) {
      message = `${pattern[K.check.custom].name} CustomValidator${message}`;
    }

    return message;
  }

  try {
    return `${pattern}`;
  }
  catch (e) {
    return 'Unknown value';
  }
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

  try {
    return `${value}`;
  }
  catch (e) {
    return 'Unknown value';
  }
};

// NOTE: Define beautifyPattern and beautifyValue on K.Internals.check
// Only if K.debug is present
if (K.debug && K.debug === true) {
  K.Internals.check.beautifyValue = beautifyValue;
  K.Internals.check.beautifyPattern = beautifyPattern;
}
