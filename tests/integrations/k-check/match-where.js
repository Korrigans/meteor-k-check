integrateMatchWhere = function integrateMatchWhere() {
  describe('vs checkLegacyMatchWhere', () => {
    it('should call checkLegacyMatchWhere when pattern is Match.Where', () => {
      const
        value = 42,
        pattern = Match.Where(() => true);

      spyOn(K.Internals.check.Patterns, 'checkLegacyMatchWhere');

      K.check(value, pattern);

      expect(K.Internals.check.Patterns.checkLegacyMatchWhere).toHaveBeenCalledWith(value, pattern);
      expect(K.Internals.check.Patterns.checkLegacyMatchWhere.calls.count()).toEqual(1);
    });
  });
};
