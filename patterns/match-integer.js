let warnedAboutMatchInteger = false;

/**
 * Check value against legacy Match.Integer pattern
 * @param  {*} value Value to check
 * @memberof Patterns
 * @throws {Error} Value was not conform to pattern
 * @returns {undefined}
 */
Patterns.checkLegacyMatchInteger = function checkLegacyMatchInteger(value) {
  if (console.warn && !warnedAboutMatchInteger) {
    console.warn(
      'Match.Integer is deprecated and inaccurate. '
      + 'Prefer using KP.Integer() from korrigans:k-pattern '
      + 'http://github.com/Korrigans/meteor-k-pattern'
    );
    warnedAboutMatchInteger = true;
  }

  // NOTE: This is how it's done in legacy check package.
  // We could use more accurate strategies, but that would
  // break backward compatibility
  /*
    eslint no-bitwise: 1
   */
  if (
    typeof value === 'number'
    && (value | 0) === value
  ) {
    return;
  }

  throw buildCheckError(value, 'Match.Integer');
};
