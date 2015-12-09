/**
 * Check a value against legacy plain object pattern
 * @param  {*}      value   Value to check
 * @param  {Object} pattern Object to check value against
 * @throws {Error}  Value was not conform to pattern
 * @returns {undefined}
 */
checkLegacyObject = function checkLegacyObject(value, pattern) {
  if (!_.isObject(value)) {
    throw buildCheckError(value, pattern);
  }

  const
    patternKeys = _.keys(pattern),
    valueKeys = _.keys(value),
    excessKeys = _.difference(valueKeys, patternKeys),
    missingKeys = _.difference(patternKeys, valueKeys);

  if (excessKeys.length > 0 || missingKeys.length > 0) {
    const error = buildCheckError(value, pattern);

    error.message
    += ` (${excessKeys.length > 0 ? `excess: ${excessKeys.join(', ')}` : ''}`
    + `${excessKeys.length > 0 && missingKeys.length > 0 ? '; ' : ''}`
    + `${missingKeys.length > 0 ? `missing: ${missingKeys.join(', ')}` : ''})`;

    throw error;
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
