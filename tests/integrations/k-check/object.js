integrateObject = function integrateObject() {
  describe('vs checkLegacyObject', () => {
    it('should call checkLegacyObject when pattern is custom', () => {
      const
        value = { foo: true },
        pattern = { foo: Boolean };

      spyOn(K.Internals.check.Patterns, 'checkLegacyObject');

      K.check(value, pattern);

      expect(K.Internals.check.Patterns.checkLegacyObject).toHaveBeenCalledWith(value, pattern);
      expect(K.Internals.check.Patterns.checkLegacyObject.calls.count()).toEqual(1);
    });
    it('should call K.check recursively for each key in pattern and value', () => {
      const
        subValue = 'very stronk',
        subPattern = String,

        value = { korrigans: subValue },
        pattern = { korrigans: subPattern };

      spyOn(K, 'check').and.callThrough();

      K.check(value, pattern);

      expect(K.check).toHaveBeenCalledWith(subValue, subPattern);
      expect(K.check.calls.count()).toEqual(2);
    });
  });
};
