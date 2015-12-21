const cFP = K.Internals.check.Patterns.checkForPrimitive;

describe('[k-check][Unit] checkForPrimitive', () => {
  it('should be a function', () => {
    const
      expected = 'function',
      actual = typeof cFP;

    expect(actual).toEqual(expected);
  });
  describe('matches', () => {
    for (let type of primitiveValues.keys()) {
      for (let testCase of primitiveValues.get(type)) {
        matches(cFP, testCase, type,
          `${beautifyValue(testCase)} is ${beautifyPattern(type)}`
        );
      }
    }
    // Test manually that NaN is a Number. Legacy behaviour. wtf.
    matches(cFP, NaN, Number, 'NaN is a number (..?)');
  });
  describe('fails', () => {
    for (let type of primitiveValues.keys()) {
      const allTypes = [];

      // NOTE: Manually populate all types, Babel does not seem to like:
      //     allTypes = [...primitiveValues.keys()]
      // (Returns a MapIterator instead of an array)
      for (let primitiveType of primitiveValues.keys()) {
        allTypes.push(primitiveType);
      }

      const otherTypes = _.without(
        allTypes,
        type
      );

      for (let testCase of primitiveValues.get(type)) {
        for (let testType of otherTypes) {
          // Fuzzy test each value against all other existing types
          fails(cFP, testCase, testType,
            `${beautifyValue(testCase)} is not ${beautifyPattern(testType)}`
          );
        }
      }
    }
  });
});
