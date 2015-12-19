const cCF = K.Internals.check.checkCustomFunction;

describe('[k-check][Unit] checkCustomFunction', () => {
  it('should be a function', () => {
    const
      expected = 'function',
      actual = typeof cCF;

    expect(actual).toEqual(expected);
  });

  it('should use this Symbol when running a check', () => {
    const
      testFunc = jasmine.createSpy('testFunc'),
      testPattern = { [K.check.custom]: testFunc },

      // NOTE: We're testing against a bare function, value is not important
      testValue = 'some test value';

    cCF(testValue, testPattern);

    expect(testFunc).toHaveBeenCalledWith(testValue);
    expect(testFunc.calls.count()).toEqual(1);
  });

  it('should preserve pattern context when running custom function', () => {
    /*
      eslint consistent-this:0 no-invalid-this:0
     */
    let calledContext = null;
    const
      registerThis = function registerThis() { calledContext = this; },
      testPattern = { [K.check.custom]: registerThis };

    cCF('some value', testPattern);
    expect(calledContext === testPattern).toEqual(true);
  });

  it('shoud propagate error thrown by custom function', () => {
    const
      testErrorMessage = 'Something went right',
      testError = Error(testErrorMessage),
      testPattern = {
        [K.check.custom]: () => { throw testError; }
      },

      // NOTE: We're throwing an error anyway, value is not important
      testValue = 'some test value';

    expect(
      () => cCF(testValue, testPattern)
    ).toThrowError(Error, new RegExp(testErrorMessage));
  });

  it('should throw an error if custom function is not function', () => {
    const
      testPattern = {
        [K.check.custom]: 'not a function'
      },

      // NOTE: We're expecting cCF to go bonk, value is not important
      testValue = 'some test value';

    expect(
      () => cCF(testValue, testPattern)
    ).toThrowError(Error,
      '[K.check] Expected custom function to be a function, got string'
    );
  });
});
