testMatchOneOf = function testMatchOneOf() {
  describe('Match.OneOf', () => {
    const testTypes = [Boolean, Function],
      testPattern = Match.OneOf(...testTypes);

    describe('matches', () => {
      for (let testType of testTypes) {
        for (let testCase of primitiveValues.get(testType)) {
          matches(testCase, testPattern,
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
          fails(testCase, testPattern,
            `Match.OneOf does not allow ${beautifyValue(testCase)}`
            + ` with ${beautifyPattern(testPattern)}`
          );
        }
      }
    });
  });
}
