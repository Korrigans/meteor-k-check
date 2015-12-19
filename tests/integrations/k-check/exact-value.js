integrateExactValues = function integrateExactValues() {
  describe('vs checkForExactValues', () => {
    it('should call checkForExactValues when pattern is primitive value', () => {
      const
        value = 42,
        pattern = 42;

      spyOn(K.Internals.check.Patterns, 'checkForExactValues');

      K.check(value, pattern);

      expect(K.Internals.check.Patterns.checkForExactValues).toHaveBeenCalledWith(value, pattern);
      expect(K.Internals.check.Patterns.checkForExactValues.calls.count()).toEqual(1);
    });
  });
};
