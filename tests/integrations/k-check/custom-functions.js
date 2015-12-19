integrateCustomFunctions = function integrateCustomFunctions() {
  describe('vs checkCustomFunction', () => {
    it('should call checkLegacyMatchWhere when pattern is custom', () => {
      const
        value = 42,
        pattern = { [K.check.custom]() {} };

      spyOn(K.Internals.check.Patterns, 'checkCustomFunction');

      K.check(value, pattern);

      expect(K.Internals.check.Patterns.checkCustomFunction).toHaveBeenCalledWith(value, pattern);
      expect(K.Internals.check.Patterns.checkCustomFunction.calls.count()).toEqual(1);
    });
  });
};
