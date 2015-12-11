integrateArray = function integrateArray() {
  describe('Legacy array patterns', () => {
    describe('matches', () => {
      for (let type of primitiveValues.keys()) {
        const testCase = primitiveValues.get(type);

        matches(K.check, testCase, [type],
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

          fails(K.check, testCase, testType,
            `${beautifyValue(testCase)} is not ${beautifyPattern(testType)}`
          );
        }
      }
    });
  });
};
