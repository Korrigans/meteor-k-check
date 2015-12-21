integrateMatchOneOf = function integrateMatchOneOf() {
  describe('vs checkLegacyMatchOneOf', () => {
    it('should call checkLegacyMatchOneOf if pattern is a MatchOneOf', () => {
      const
        value = 42,
        mOO = Match.OneOf(Match.Integer, String);

      spyOn(K.Internals.check.Patterns, 'checkLegacyMatchOneOf');

      K.check(value, mOO);

      expect(K.Internals.check.Patterns.checkLegacyMatchOneOf)
        .toHaveBeenCalledWith(value, mOO);
      expect(K.Internals.check.Patterns.checkLegacyMatchOneOf.calls.count())
        .toEqual(1);
    });
    it('should use K.check on each subpattern until success', () => {
      const
        value = 42,
        mOO = Match.OneOf(String, Number, Boolean);

      spyOn(K, 'check').and.callThrough();

      K.check(value, mOO);

      expect(K.check).toHaveBeenCalledWith(value, String);
      expect(K.check).toHaveBeenCalledWith(value, Number);
      expect(K.check).not.toHaveBeenCalledWith(value, Boolean);
    });
  });
};
