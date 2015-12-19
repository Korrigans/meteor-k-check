describe('[k-check][Unit] K.check', () => {
  it('should be a function', () => {
    const expected = 'function',
      actual = typeof K.check;

    expect(actual).toEqual(expected);
  });

  it('should define a special Symbol', () => {
    const
      expected = typeof Symbol(),
      actual = typeof K.check.custom;

    // NOTE: On old browser and Node v0.10.40 (used by Meteor 1.2.1),
    // typeof Symbol() === 'object' due to Babel's polyfill
    // On modern technologies, typeof Symbol() === 'symbol'
    expect(actual).toEqual(expected);
  });

  describe('incompatibilities', () => {
    it('should not run validation if pattern is object with "pattern" field', () => {
      // We are going to run a check which would fail for any other field name
      const
        value = {
          pattern: true
        },
        pattern = {
          pattern: String
        };

      spyOn(console, 'error');
      spyOn(K.Internals.check.Patterns, 'checkLegacyObject');

      K.check(value, pattern);

      expect(console.error).toHaveBeenCalled();
      expect(
        K.Internals.check.Patterns.checkLegacyObject
      ).not.toHaveBeenCalled();
    });
  });

  // NOTE: We can't really integrate Match.Any because it literally matches
  // anything, thus creating a module makes no sense.
  describe('Match.any', () => {
    describe('matches', () => {
      // Test if everything passes with Match.Any
      for (let type of primitiveValues.keys()) {
        for (let testCase of primitiveValues.get(type)) {
          matches(K.check, testCase, matchAny,
            `Match.Any allows ${beautifyValue(testCase)} `
            + `of type ${beautifyPattern(matchAny)}`
          );
        }
      }
    });
  });
});
