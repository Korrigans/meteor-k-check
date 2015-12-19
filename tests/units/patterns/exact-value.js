const cFEV = K.Internals.check.checkForExactValues;

describe('[k-check][Unit] checkForExactValues', () => {
  it('should be a function', () => {
    const
      expected = 'function',
      actual = typeof cFEV;

    expect(actual).toEqual(expected);
  });
  describe('matches', () => {
    const primitivesTests = _.flatten([
      primitiveValues.get(Boolean),
      primitiveValues.get(Number),
      primitiveValues.get(String)
    ]);

    for (let testCase of primitivesTests) {
      const beautifiedCase = beautifyValue(testCase);

      matches(cFEV, testCase, testCase,
        `${beautifiedCase} is ${beautifiedCase}`
      );
    }
  });
  describe('fails', () => {
    const primitivesTests = _.flatten([
      primitiveValues.get(Boolean),
      primitiveValues.get(Number),
      primitiveValues.get(String)
    ]);

    for (let testCase of primitivesTests) {
      const testPatterns = _.without(primitivesTests, testCase);

      for (let testPattern of testPatterns) {
        fails(cFEV, testCase, testPattern,
          `${beautifyValue(testCase)} is not ${beautifyValue(testPattern)}`
        );
      }
    }
  });
});
