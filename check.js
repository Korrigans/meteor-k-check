let warnedAboutMatchIncompatibilities = false;

K.check = function KCheck(value, pattern) {
  // Special legacy Match patterns
  const
    matchAny = ['__any__'],
    matchInteger = ['__integer__'];


  // Custom K.check pattern
  if (_.isObject(pattern) && pattern[K.check.custom]) {
    const testFunc = pattern[K.check.custom];

    if (!_.isFunction(testFunc)) {
      throw new Error(
        `${errorPrefix} Expected custom function to be a function, `
        + `got ${typeof testFunc}`
      );
    }

    testFunc(value);
    return;
  }

  // PRIMITIVE TESTS
  if (primitiveMap.has(pattern)) {
    checkForPrimitive(value, pattern);
    return;
  }

  // Match.Any
  if (_.isEqual(pattern, matchAny)) {
    return;
  }

  // Match.Integer
  if (_.isEqual(pattern, matchInteger)) {
    checkLegacyMatchInteger(value);
    return;
  }

  // Legacy array pattern, looking like [pattern]
  if (_.isArray(pattern)) {
    checkLegacyArray(value, pattern);
    return;
  }

  // Match.OneOf
  if (pattern.choices) {
    checkLegacyMatchOneOf(value, pattern);
    return;
  }

  // Match.Where
  if (_.isFunction(pattern.condition)) {
    checkLegacyWhere(value, pattern);
    return;
  }

  // Legacy object pattern
  if (_.isObject(pattern)) {
    checkLegacyObject(value, pattern);
    return;
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
        + 'and Match.ObjectWithValues due to a malfunction of the native check '
        + 'package. Instead, use korrigans:k-pattern '
        + 'http://github.com/Korrigans/meteor-k-pattern'
      );
      warnedAboutMatchIncompatibilities = true;
    }
    return;
  }

  // Some legacy primitive values tests
  if (_.includes(['string', 'number', 'boolean'], typeof pattern)) {
    if (value !== pattern) {
      throw buildCheckError(value, pattern);
    }
    return;
  }

  // Nothing caught, unknown pattern
  throw new Error(`${errorPrefix} Unknown pattern ${beautifyPattern(pattern)}`);
};
