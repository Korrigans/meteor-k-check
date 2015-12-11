integrateMatchWhere = function integrateMatchWhere() {
  describe('Match.Where', () => {
    describe('matches', () => {
      it('should use the function given to Match.Where', () => {
        const
          testPattern = Match.Where(() => true),
          testFunc = spyOn(testPattern, 'condition').and.callThrough(),

          // NOTE: We are testing against a bare function,
          // test value is not important
          testValue = 'some test value';

        K.check(testValue, testPattern);
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
          () => K.check(testValue, testPattern)
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
            fails(K.check, index, testPattern,
              `fails for ${beautifyValue(falseyValues[index])}`
            );
          }
        }
      });
    });
  });
};
