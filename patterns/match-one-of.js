let warnedAboutMatchOneOf = false;

/**
 * Check a value against legacy Match.OneOf pattern
 * @param  {*} value   Value to check
 * @param  {{ choices : Array }} pattern Pattern to check value against
 * @throws {Error}  Value was not conform to pattern
 * @returns {undefined}
 */
checkLegacyMatchOneOf = function checkLegacyMatchOneOf(value, pattern) {
  if (!warnedAboutMatchOneOf) {
    console.warn(
      'It looks like you are using Match.OneOf.\n'
      + 'K.check tried to detect it, but might have misunderstood/conflicted.\n'
      // TODO: Once it's done, replace with actual API method (Like KP.OneOf or something)
      + 'Prefer using korrigans:k-pattern http://github.com/Korrigans/k-pattern'
    );
    warnedAboutMatchOneOf = true;
  }
  const choices = pattern.choices;
  let failedAttemps = 0;

  for (let subPattern of choices) {
    try {
      K.check(value, subPattern);
    }
    catch (e) {
      if (!_.includes(e.message, errorPrefix)) {
        // Unknown error, propagate
        throw e;
      }
      failedAttemps += 1;
    }
  }
  // Did _all_ attemps fail?
  if (failedAttemps === choices.length) {
    throw buildCheckError(value, pattern);
  }
};

if (K.debug && K.debug === true) {
  K.Internals.check.checkLegacyMatchOneOf = checkLegacyMatchOneOf;
}
