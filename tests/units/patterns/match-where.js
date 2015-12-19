const cLW = K.Internals.check.Patterns.checkLegacyMatchWhere;

describe('[k-check][Unit] checkLegacyWhere', () => {
  it('should be a function', () => {
    const
      expected = 'function',
      actual = typeof cLW;

    expect(actual).toEqual(expected);
  });
  it('should warn if you use Match.Where', () => {
    spyOn(console, 'warn');

    const
      testPattern = Match.Where(_.identity);

    cLW(true, testPattern);
    cLW(true, testPattern);

    expect(console.warn).toHaveBeenCalled();
    expect(console.warn.calls.count()).toEqual(1);
  });
  it('should throw TypeError if Match.Where condition is not function', () => {
    const testPattern = Match.Where();

    expect(() => cLW(true, testPattern)).toThrowError(TypeError,
      'Expected Match.Where validator to be a function, got undefined'
    );
  });
  describe('matches', () => {
    it('should use the function given to Match.Where', () => {
      const
        testPattern = Match.Where(() => true),
        testFunc = spyOn(testPattern, 'condition').and.callThrough(),

        // NOTE: We are testing against a bare function,
        // test value is not important
        testValue = 'some test value';

      cLW(testValue, testPattern);
      expect(testFunc).toHaveBeenCalledWith(testValue);
      expect(testFunc.calls.count()).toEqual(1);
    });
  });
  describe('fails', () => {
    it('should propagate errors throw by the custom function', () => {
      const
        testErrorMessage = 'Something went right',
        testError = new Error(testErrorMessage),
        testPattern = Match.Where(() => { throw testError; }),

        // NOTE: We are throwing anyway, test value is not important
        testValue = 'some test value';

      expect(
        () => cLW(testValue, testPattern)
      ).toThrowError(Error, testErrorMessage);
    });
    describe('errors if custom function returned falsey value', () => {
      const
        falseyValues = [
          '',
          false,
          0,
          NaN,
          null,
          undefined
        ],
        testPattern = Match.Where(i => falseyValues[i]);

      for (let index in falseyValues) {
        if (falseyValues.hasOwnProperty(index)) {
          fails(cLW, index, testPattern,
            `fails for ${beautifyValue(falseyValues[index])}`
          );
        }
      }
    });
  });
});
