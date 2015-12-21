const cLMOO = K.Internals.check.Patterns.checkLegacyMatchOneOf;

describe('[k-check][Unit] checkLegacyMatchOneOf', () => {
  const
    testTypes = [Boolean, Function],
    testPattern = Match.OneOf(...testTypes);

  it('should be a function', () => {
    const
      expected = 'function',
      actual = typeof cLMOO;

    expect(actual).toEqual(expected);
  });

  /*
    eslint no-console:0
   */
  it('should warn once if a Match.OneOf is used', () => {
    spyOn(console, 'warn');

    cLMOO(true, testPattern);
    cLMOO(true, testPattern);

    expect(console.warn).toHaveBeenCalled();
    expect(console.warn.calls.count()).toEqual(1);
  });
  it('should call K.check for each sub pattern until success', () => {
    spyOn(K, 'check');

    cLMOO(true, testPattern);

    expect(K.check).toHaveBeenCalledWith(true, Boolean);
  });
  describe('matches', () => {
    for (let testType of testTypes) {
      for (let testCase of primitiveValues.get(testType)) {
        matches(cLMOO, testCase, testPattern,
          `Match.OneOf allows ${beautifyValue(testCase)} `
          + `with ${beautifyPattern(testPattern)}`
        );
      }
    }
  });
  describe('fails', () => {
    const allTypes = [];

    for (let type of primitiveValues.keys()) {
      allTypes.push(type);
    }

    const otherTypes = _.difference(allTypes, testTypes);

    for (let testType of otherTypes) {
      for (let testCase of primitiveValues.get(testType)) {
        fails(cLMOO, testCase, testPattern,
          `Match.OneOf does not allow ${beautifyValue(testCase)}`
          + ` with ${beautifyPattern(testPattern)}`
        );
      }
    }
  });
});
