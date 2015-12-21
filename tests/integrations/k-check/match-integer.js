integrateMatchInteger = function integrateMatchInteger() {
  describe('vs checkLegacyMatchInteger', () => {
    it('should call checkLegacyMatchInteger if pattern is MatchInteger', () => {
      const
        value = 42,
        pattern = Match.Integer;

      spyOn(K.Internals.check.Patterns, 'checkLegacyMatchInteger');

      K.check(value, pattern);

      expect(K.Internals.check.Patterns.checkLegacyMatchInteger)
        .toHaveBeenCalledWith(value, pattern);
      expect(K.Internals.check.Patterns.checkLegacyMatchInteger.calls.count())
        .toEqual(1);
    });
  });
};
