testPrimitiveTypes = function testPrimitiveTypes() {
  describe('Primitive types', () => {
    describe('matches', () => {
      for (let type of primitiveValues.keys()) {
        for (let testCase of primitiveValues.get(type)) {
          matches(testCase, type,
            `${beautifyValue(testCase)} is ${beautifyPattern(type)}`
          );
        }
      }
      const primitivesTests = _.flatten([
        primitiveValues.get(Boolean),
        primitiveValues.get(Number),
        primitiveValues.get(String)
      ]);

      for (let testCase of primitivesTests) {
        const beautifiedCase = beautifyValue(testCase);

        matches(testCase, testCase,
          `${beautifiedCase} is ${beautifiedCase}`
        );
      }

      // Test manually that NaN is a Number. Legacy behaviour. wtf.
      matches(NaN, Number, 'NaN is a number (..?)');
    });
    describe('fails', () => {
      for (let type of primitiveValues.keys()) {
        const allTypes = [];

        // XXX: Manually populate all types, Babel does not seem to like:
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
            fails(testCase, testType,
              `${beautifyValue(testCase)} is not ${beautifyPattern(testType)}`
            );
          }
        }
      }
      const primitivesTests = _.flatten([
        primitiveValues.get(Boolean),
        primitiveValues.get(Number),
        primitiveValues.get(String)
      ]);

      for (let testCase of primitivesTests) {
        const testPatterns = _.without(primitivesTests, testCase);

        for (let testPattern of testPatterns) {
          fails(testCase, testPattern,
            `${beautifyValue(testCase)} is not ${beautifyValue(testPattern)}`
          );
        }
      }
    });
  });
};
