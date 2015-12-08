let warnedAboutMatchWhere = false;

/**
 * Check a value against legacy Match.Where pattern
 * @param  {*}                        value   Value to check
 * @param  {{ condition : Function }} pattern Match.Where pattern
 * @throws {Error}  Value was not conform to pattern
 */
checkLegacyWhere = function checkLegacyWhere(value, pattern) {
  if(!warnedAboutMatchWhere) {
    console.warn(
      'It looks like you are using Match.Where.\n' +
      'K.check tried to detect it, but might have misunderstood or conflicted.\n' +
      'Prefer using korrigans:k-pattern http://github.com/Korrigans/k-pattern'
    );

    warnedAboutMatchWhere = true;
  }

  const
    testFunc = pattern.condition,
    testResult = testFunc(value);

  if(!testResult) {
    throw new Error(
      `${errorPrefix} Failed Match.Where validation (${beautifyPattern(testFunc)}) with ${beautifyValue(value)}`
    )
  }
}
