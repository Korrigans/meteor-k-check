let warnedAboutMatchIncompatibilities = false;

/**
 * Runs a validation of a value against a pattern
 * The value can be anything, pattern can either be
 *  - A legacy Match.pattern such as Match.Where
 *  - A custom K.check pattern recognized by a Symbol
 * If validation was not succesfull, a descriptive error is thrown
 * If recursivity is used (legacy array and object patterns), the validation
 * path (object keys, array indexes) is tracked and provided in errors.
 * @param  {*} value   Value to validate
 * @param  {*} pattern Pattern against which to validate
 * @throws {Error}     Descriptive error if validation failed
 * @throws {Error}     Pattern was not recognized
 * @return {undefined}
 * @example
 * K.check(123, Number); // Passes
 * K.check(new Date(), Date); // Passes
 * K.check({
 *   foo: 'foo value'
 * }, { foo: String }); // Passes
 *
 * K.check([{
 *   foo: 'foo value',
 *   bar: true
 * }], [{ foo: String, bam: null}]); //Fails with:
 * Error: [K.check] Expected { foo: string, bam: null }, got { foo: "foo value",
 *  bar: Unknown value } (excess: bar; missing: bam)
 *  at index 0 of [{ foo: "foo value", bar: Unknown value }]
 *  against [{ foo: string, bam: null }]
 */
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
    // Custom K.check pattern detected via Symbol
    if (_.isObject(pattern) && pattern[K.check.custom]) {
      return Patterns.checkCustomFunction;
    }

    // PRIMITIVE TESTS
    if (primitiveMap.has(pattern)) {
      return Patterns.checkForPrimitive;
    }

    // Match.Any
    if (_.isEqual(pattern, matchAny)) {
      return _.noop;
    }

    // Match.Integer
    if (_.isEqual(pattern, matchInteger)) {
      return Patterns.checkLegacyMatchInteger;
    }

    // Legacy array pattern, looking like [pattern]
    if (_.isArray(pattern)) {
      return Patterns.checkLegacyArray;
    }

    // Match.OneOf
    if (pattern.choices) {
      return Patterns.checkLegacyMatchOneOf;
    }

    // Match.Where
    if (_.isFunction(pattern.condition)) {
      return Patterns.checkLegacyMatchWhere;
    }

    // Legacy object pattern
    if (_.isObject(pattern)) {
      // NOTE: Unrecoverable incompatibility with check
      // If pattern is either:
      //  - Match.Optional
      //  - Match.ObjectIncluding
      //  - Match.ObjectWithValues
      // There is no way we can differentiate them without including check.
      // Each uses the constructor pattern with a local variable, assigning
      // the same "pattern" field, making them indistinguishable.
      if (_.has(pattern, 'pattern')) {
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

      return Patterns.checkLegacyObject;
    }

    // Some legacy primitive values tests
    if (_.includes(['string', 'number', 'boolean'], typeof pattern)) {
      return Patterns.checkForExactValues;
    }

    // Nothing caught, unknown pattern
    // First empty buildCheckError.path, then throw
    // NOTE: As of today (December 2015), Meteor runs on an old Node version.
    // The only situation in which this code could be run is if pattern is
    // a Symbol value. This is not testable due to Babel limitation:
    // typeof Symbol() === 'object' with polyfill.
    // Due to this, this code is untested.
    // Once Meteor updates and we add 'symbol' to the list of primitive values
    // tests, this code should be theoretically dead.
    while (buildCheckError.path.length > 0) {
      buildCheckError.path.pop();
    }
    throw new Error(
      `${errorPrefix} Could not recognize: ${beautifyPattern(pattern)}`
    );
  }

  getCheck()(value, pattern);

  // If we reached here, it means the above check didn't throw.
  // Hence, we can remove last path element as it is no longer needed for error
  // reporting (there's no error to be reported)
  buildCheckError.path.removeLast();
};
