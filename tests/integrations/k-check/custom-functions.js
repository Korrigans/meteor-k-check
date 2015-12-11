integrateCustomFunctions = function integrateCustomFunctions() {
  describe('Custom function', () => {
    it('should define a special Symbol', () => {
      const
        expected = typeof Symbol(),
        actual = typeof K.check.custom;

      // NOTE: On old browser and Node v0.10.40 (used by Meteor 1.2.1),
      // typeof Symbol() === 'object' due to Babel's polyfill
      // On modern technologies, typeof Symbol() === 'symbol'
      expect(actual).toEqual(expected);
    });

    it('should use this Symbol when running a check', () => {
      const
        testFunc = jasmine.createSpy('testFunc'),
        testPattern = { [K.check.custom]: testFunc },

        // NOTE: We're testing against a bare function, value is not important
        testValue = 'some test value';

      K.check(testValue, testPattern);

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

      K.check('some value', testPattern);
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
        () => K.check(testValue, testPattern)
      ).toThrowError(Error, new RegExp(testErrorMessage));
    });

    describe('errors', () => {
      it('should throw an error if custom function is not function', () => {
        const
          testPattern = {
            [K.check.custom]: 'not a function'
          },

          // NOTE: We're expecting K.check to go bonk, value is not important
          testValue = 'some test value';

        expect(
          () => K.check(testValue, testPattern)
        ).toThrowError(Error,
          '[K.check] Expected custom function to be a function, got string'
        );
      });
    });
  });
};
