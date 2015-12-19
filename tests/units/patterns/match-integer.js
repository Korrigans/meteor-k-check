const cLMI = K.Internals.check.checkLegacyMatchInteger;

describe('[k-check][Unit] checkLegacyMatchInteger', () => {
  const
    testNumbers = primitiveValues.get(Number),
    // NOTE: While this may seem incorrect with methods like
    // Number.isInteger, this is done to keep the legacy behaviour of check
    /*
    eslint no-bitwise: 0
    */
    integers = _.filter(testNumbers, n => (n | 0) === n),

    nonIntegers = _.without(testNumbers, ...integers);

  it('should be a function', () => {
    const
      expected = 'function',
      actual = typeof cLMI;

    expect(actual).toEqual(expected);
  });
  it('should warn once if a Match.Integer is used', () => {
    spyOn(console, 'warn');

    const testPattern = Match.Integer;

    cLMI(2, testPattern);
    cLMI(1, testPattern);

    expect(console.warn).toHaveBeenCalled();
    expect(console.warn.calls.count()).toEqual(1);
  });
  describe('matches', () => {
    for (let integer of integers) {
      matches(cLMI, integer, matchInteger,
        `Match.Integer allows ${integer}`
      );
    }
  });
  describe('fails', () => {
    const otherTypes = [];

    for (let nonInteger of nonIntegers) {
      fails(cLMI, nonInteger, matchInteger,
        `Match.Integer does not allow ${nonInteger}`
      );
    }

    for (let type of primitiveValues.keys()) {
      if (type !== Number) {
        otherTypes.push(type);
      }
    }

    for (let testType of otherTypes) {
      for (let testCase of primitiveValues.get(testType)) {
        fails(cLMI, testCase, matchInteger,
          `Match.Integer does not allow ${beautifyValue(testCase)} `
          + `of type ${beautifyPattern(matchInteger)}`
        );
      }
    }
  });
});
