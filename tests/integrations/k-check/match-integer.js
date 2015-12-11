integrateMatchInteger = function integrateMatchInteger() {
  describe('Match.Integer', () => {
    const
      testNumbers = primitiveValues.get(Number),
      // NOTE: While this may seem incorrect with methods like
      // Number.isInteger, this is done to keep the legacy behaviour of check
      /*
        eslint no-bitwise: 0
       */
      integers = _.filter(testNumbers, n => (n | 0) === n),

      nonIntegers = _.without(testNumbers, ...integers);

    describe('matches', () => {
      for (let integer of integers) {
        matches(K.check, integer, matchInteger,
          `Match.Integer allows ${integer}`
        );
      }
    });
    describe('fails', () => {
      const otherTypes = [];

      for (let nonInteger of nonIntegers) {
        fails(K.check, nonInteger, matchInteger,
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
          fails(K.check, testCase, matchInteger,
            `Match.Integer does not allow ${beautifyValue(testCase)} `
            + `of type ${beautifyPattern(matchInteger)}`
          );
        }
      }
    });
  });
};
