integrateArray = function integrateArray() {
  describe('vs checkLegacyArray', () => {
    it('should call checkLegacyArray when pattern is custom', () => {
      const
        value = [true],
        pattern = [Boolean];

      spyOn(K.Internals.check.Patterns, 'checkLegacyArray');

      K.check(value, pattern);

      expect(K.Internals.check.Patterns.checkLegacyArray).toHaveBeenCalledWith(value, pattern);
      expect(K.Internals.check.Patterns.checkLegacyArray.calls.count()).toEqual(1);
    });
    it('should call K.check recursively for each index in pattern and value', () => {
      const
        [subValueA, subValueB, subValueC] = [true, false, false],
        subPattern = Boolean,

        value = [subValueA, subValueB, subValueC],
        pattern = [subPattern];

      spyOn(K, 'check').and.callThrough();

      K.check(value, pattern);

      expect(K.check).toHaveBeenCalledWith(subValueA, subPattern);
      expect(K.check).toHaveBeenCalledWith(subValueB, subPattern);
      expect(K.check).toHaveBeenCalledWith(subValueC, subPattern);
      expect(K.check.calls.count()).toEqual(1 + value.length);
    });
  });
};
