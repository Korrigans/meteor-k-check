let warnedAboutMatchIncompatibilities = false;

K.check = function KCheck(value, pattern) {
  // Special legacy Match patterns
  const
    matchAny = ['__any__'],
    matchInteger = ['__integer__'];

  /**
   * Determines which function should be run depending on the pattern
   * @return {Function} Proper function to run for this specific pattern
   */
  function getCheck() {
    // Custom K.check pattern
    if (_.isObject(pattern) && pattern[K.check.custom]) {
      const testFunc = pattern[K.check.custom];

      if (!_.isFunction(testFunc)) {
        throw new Error(
          `${errorPrefix} Expected custom function to be a function, `
          + `got ${typeof testFunc}`
        );
      }
      // NOTE: We are not using testFunc here to preserve context
      // It is also why we are using an enclosing function
      return function doCustomtest() {
        pattern[K.check.custom](value);
      };
    }

    // PRIMITIVE TESTS
    if (primitiveMap.has(pattern)) {
      return checkForPrimitive;
    }

    // Match.Any
    if (_.isEqual(pattern, matchAny)) {
      return _.noop;
    }

    // Match.Integer
    if (_.isEqual(pattern, matchInteger)) {
      return checkLegacyMatchInteger;
    }

    // Legacy array pattern, looking like [pattern]
    if (_.isArray(pattern)) {
      return checkLegacyArray;
    }

    // Match.OneOf
    if (pattern.choices) {
      return checkLegacyMatchOneOf;
    }

    // Match.Where
    if (_.isFunction(pattern.condition)) {
      return checkLegacyWhere;
    }

    // Legacy object pattern
    if (_.isObject(pattern)) {
      return checkLegacyObject;
    }

    // NOTE: Unrecoverable incompatibility with check
    // If pattern is either:
    //  - Match.Optional
    //  - Match.ObjectIncluding
    //  - Match.ObjectWithValues
    // There is no way we can differentiate them without including check.
    // Each uses the constructor pattern with a local variable, assigning
    // the same "pattern" field, making them indistinguishable.
    if (pattern.pattern) {
      if (!warnedAboutMatchIncompatibilities) {
        // Throw an error instead?
        console.error(
          'K.check is incompatible with Match.Optional, Match.ObjectIncluding, '
          + 'and Match.ObjectWithValues due to a malfunction of native check '
          + 'package. Instead, use korrigans:k-pattern '
          + 'http://github.com/Korrigans/meteor-k-pattern'
        );
        warnedAboutMatchIncompatibilities = true;
      }

      return _.noop;
    }

    // Some legacy primitive values tests
    if (_.includes(['string', 'number', 'boolean'], typeof pattern)) {
      return function() {
        if (value !== pattern) {
          throw buildCheckError(value, pattern);
        }
      };
    }

    // Nothing caught, unknown pattern
    throw new Error(`${errorPrefix} Unknown pattern ${beautifyPattern(pattern)}`);
  }

  getCheck()(value, pattern);
  buildCheckError.path.pop();
};
