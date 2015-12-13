let warnedAboutMatchWhere = false;

/**
 * Check a value against legacy Match.Where pattern
 * @param  {*}                        value   Value to check
 * @param  {{ condition : Function }} pattern Match.Where pattern
 * @throws {Error}  Value was not conform to pattern
 * @returns {undefined}
 */
checkLegacyWhere = function checkLegacyWhere(value, pattern) {
  if (!warnedAboutMatchWhere) {
    console.warn(
      'It looks like you are using Match.Where.\n'
      + 'K.check tried to detect it but might have misunderstood/conflicted.\n'
      + 'Prefer using korrigans:k-pattern http://github.com/Korrigans/k-pattern'
    );

    warnedAboutMatchWhere = true;
  }

  const
    testFunc = pattern.condition,
    testResult = testFunc(value);

  if (!testResult) {
    throw buildCheckError(
      testResult,
      `Match.Where validator ${beautifyPattern(testFunc)} to return truthy value`
    );
  }
};

if (K.debug && K.debug === true) {
  K.Internals.check.checkLegacyWhere = checkLegacyWhere;
}
