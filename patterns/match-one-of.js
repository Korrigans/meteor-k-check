let warnedAboutMatchOneOf = false;

/*
  eslint no-console:0
 */
/**
 * Check a value against legacy Match.OneOf pattern
 * @param  {*} value   Value to check
 * @param  {{ choices : Array }} pattern Pattern to check value against
 * @memberof Patterns
 * @throws {Error}  Value was not conform to pattern
 * @returns {undefined}
 */
Patterns.checkLegacyMatchOneOf
  = function checkLegacyMatchOneOf(value, pattern) {
    if (!warnedAboutMatchOneOf) {
      console.warn(
        'It looks like you are using Match.OneOf.\n'
        + 'K.check tried to detect it but may have misunderstood/conflicted.\n'
        // TODO: Once it's done, replace with actual API method (Like KP.OneOf or something)
        + 'Prefer using korrigans:k-pattern http://github.com/Korrigans/k-pattern'
      );
      warnedAboutMatchOneOf = true;
    }

    let success = false;

    for (let subPattern of pattern.choices) {
      try {
        K.check(value, subPattern);
        success = true;
      }
      catch (e) {
        if (!_.includes(e.message, errorPrefix)) {
          // Unknown error, propagate
          throw e;
        }
      }
      if (success) {
        break;
      }
    }

    if (!success) {
      throw buildCheckError(value, pattern);
    }
  };
