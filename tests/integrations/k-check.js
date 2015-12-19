describe('[k-check][Integration] K.check', () => {
  integrateExactValues();

  integratePrimitiveTypes();

  describe('Special Match patterns', () => {
    integrateMatchInteger();

    integrateMatchOneOf();

    integrateMatchWhere();
  });

  integrateArray();

  integrateObject();

  integrateCustomFunctions();
});
