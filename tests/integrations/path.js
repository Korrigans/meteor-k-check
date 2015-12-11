const bCE = K.Internals.check.buildCheckError;

describe('[k-check][Integration] buildCheckError.path vs K.check', () => {
  it('should populate path when checking against recursive patterns', () => {
    spyOn(bCE.path, 'push').and.callThrough();

    K.check(['foo'], [String]);

    expect(bCE.path.push).toHaveBeenCalledWith({
      direction: 'index 0',
      of: ['foo'],
      against: [String]
    });

    K.check({
      bar: true
    }, { bar: Boolean });

    expect(bCE.path.push).toHaveBeenCalledWith({
      direction: 'key bar',
      of: { bar: true },
      against: { bar: Boolean }
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
    /*
    try {
      K.check([[['foo']]], [[[Number]]]);
    }
    catch (e) {
      e.message = '';
    }*/
    expect(() => K.check([[['foo']]], [[[Number]]])).toThrow();
    expect(bCE.path.length).toEqual(0);
  });
});
