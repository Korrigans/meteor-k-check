describe('[k-check][Integration] K.check', () => {
  integrateExactValue();

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
