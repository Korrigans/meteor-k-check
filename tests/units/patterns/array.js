const cLA = K.Internals.check.Patterns.checkLegacyArray;

describe('[k-check][Unit] checkLegacyArray', () => {
  it('should throw error if pattern is not single-element array', () => {
    const
      value = [true, 0],
      pattern = [Boolean, Number];

    expect(
      () => cLA(value, pattern)
    ).toThrowError(Error, /Legacy check array patterns allow only one element/);
  });
  it('should throw error if value is not array', () => {
    const
      value = 42,
      pattern = [Number];

    expect(
      () => cLA(value, pattern)
    ).toThrowError(Error, /Expected \[number\], got 42/);
  });

  describe('matches', () => {
    for (let type of primitiveValues.keys()) {
      const testCase = primitiveValues.get(type);

      matches(cLA, testCase, [type],
        `${beautifyValue(testCase)} is ${beautifyPattern([type])}`
      );
    }
  });

  describe('fails', () => {
    const allTypes = [];

    // XXX: Manually populate all types, Babel does not seem to like:
    //     allTypes = [...primitiveValues.keys()]
    // (Returns a MapIterator instead of an array)
    for (let primitiveType of primitiveValues.keys()) {
      allTypes.push(primitiveType);
    }

    for (let type of primitiveValues.keys()) {
      const otherTypes = _.without(
        allTypes,
        type
      );

      for (let otherType of otherTypes) {
        const testCase = primitiveValues.get(otherType),
          testType = [type];

        fails(cLA, testCase, testType,
          `${beautifyValue(testCase)} is not ${beautifyPattern(testType)}`
        );
      }
    }
  });

});
