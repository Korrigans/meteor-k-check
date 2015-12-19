integratePrimitiveTypes = function integratePrimitiveTypes() {
  describe('vs checkForPrimitive', () => {
    it('should call checkForPrimitive when pattern is primitive type', () => {
      const
        value = 42,
        pattern = Number;

      spyOn(K.Internals.check.Patterns, 'checkForPrimitive');

      K.check(value, pattern);

      expect(K.Internals.check.Patterns.checkForPrimitive).toHaveBeenCalledWith(value, pattern);
      expect(K.Internals.check.Patterns.checkForPrimitive.calls.count()).toEqual(1);
    });
  });
};
