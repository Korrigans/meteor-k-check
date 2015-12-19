const bCE = K.Internals.check.buildCheckError;

describe('[k-check][Integration] buildCheckError.path vs K.check', () => {
  describe('path population with recursive patterns', () => {
    beforeEach(() => spyOn(bCE.path, 'push').and.callThrough());

    it('should work with arrays', () => {
      const
        value = ['foo'],
        pattern = [String];

      K.check(value, pattern);

      expect(bCE.path.push).toHaveBeenCalledWith({
        direction: 'index 0',
        of: value,
        against: pattern
      });
    });

    it('should work with objects', () => {
      const
        value = { bar: true },
        pattern = { bar: Boolean };

      K.check(value, pattern);

      expect(bCE.path.push).toHaveBeenCalledWith({
        direction: 'key bar',
        of: value,
        against: pattern
      });
    });
  });

  it('should populate path when checking against a custom pattern', () => {
    const testPattern = { [K.check.custom]: function test() {} };

    spyOn(bCE.path, 'push').and.callThrough();

    K.check('dwarf', testPattern);

    expect(bCE.path.push).toHaveBeenCalledWith({
      direction: 'custom validation',
      of: 'dwarf',
      against: 'test CustomValidator{  }'
    });
  });

  it('should lock and unlock path when checking against custom pattern', () => {
    const testPattern = { [K.check.custom]: function test() {} };

    spyOn(bCE.path, 'lock').and.callThrough();
    spyOn(bCE.path, 'unlock').and.callThrough();

    K.check('another dwarf', testPattern);

    expect(bCE.path.lock.calls.count()).toEqual(1);
    expect(bCE.path.unlock.calls.count()).toEqual(1);
  });

  /* eslint no-magic-numbers: 0 */
  it('should empty path as tests go', () => {
    spyOn(bCE.path, 'removeLast').and.callThrough();

    K.check(['foo'], [String]);

    expect(bCE.path.removeLast.calls.count()).toEqual(2);

    K.check({
      bar: true
    }, { bar: Boolean });

    expect(bCE.path.removeLast.calls.count()).toEqual(4);
  });

  it('should empty path entirely if check fails', () => {
    expect(() => K.check([[['foo']]], [[[Number]]])).toThrow();
    expect(bCE.path.length).toEqual(0);
  });
});
