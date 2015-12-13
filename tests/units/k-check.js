describe('[k-check][Unit] K.check', () => {
  it('should be a function', () => {
    const expected = 'function',
      actual = typeof K.check;

    expect(actual).toEqual(expected);
  });

  describe('incompatibilities', () => {
    it('should not run validation if pattern is object with "pattern" field', () => {
      // We are going to run a check which would fail for any other field name
      const
        value = {
          pattern: true
        },
        pattern = {
          pattern: String
        };

      spyOn(console, 'error');
      spyOn(K.Internals.check, 'checkLegacyObject');

      K.check(value, pattern);

      expect(console.error).toHaveBeenCalled();
      expect(K.Internals.check.checkLegacyObject).not.toHaveBeenCalled();
    });
  });
});
