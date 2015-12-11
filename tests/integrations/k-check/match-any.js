integrateMatchAny = function integrateMatchAny() {
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
};