describe('[k-check][Integration] K.check', () => {
  integratePrimitiveTypes();

  describe('Special Match patterns', () => {
    integrateMatchAny();

    integrateMatchInteger();

    integrateMatchOneOf();

    integrateMatchWhere();
  });

  integrateArray();

  integrateObject();

  integrateCustomFunctions();
});
