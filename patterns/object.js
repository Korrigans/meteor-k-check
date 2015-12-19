/**
 * Check a value against legacy plain object pattern.
 * This pattern is recursive, it populates buildCheckError.path with
 * current key of current object value against current pattern
 * @param  {*}      value   Value to check
 * @param  {Object} pattern Object to check value against
 * @memberof Patterns
 * @throws {Error}  Value was not conform to pattern
 * @returns {undefined}
 */
Patterns.checkLegacyObject = function checkLegacyObject(value, pattern) {
  if (!_.isObject(value)) {
    throw buildCheckError(value, pattern);
  }

  const
    patternKeys = _.keys(pattern),
    valueKeys = _.keys(value),
    excessKeys = _.difference(valueKeys, patternKeys),
    missingKeys = _.difference(patternKeys, valueKeys);

  if (excessKeys.length > 0 || missingKeys.length > 0) {
    const
      eK = excessKeys,
      mK = missingKeys,

      message = `(${eK.length > 0 ? `excess: ${eK.join(', ')}` : ''}`
        + `${eK.length > 0 && mK.length > 0 ? '; ' : ''}`
        + `${mK.length > 0 ? `missing: ${mK.join(', ')}` : ''})`;

    throw buildCheckError(value, pattern, message);
  }

  for (let key in value) {
    if (value.hasOwnProperty(key)) {
      buildCheckError.path.push({
        direction: `key ${key}`,
        of: value,
        against: pattern
      });
      K.check(value[key], pattern[key]);
    }
  }
};
