const cEV = K.Internals.check.checkExactValue;

integrateExactValue = function integrateExactValue() {
  describe('vs checkExactValue', () => {
    const
      value = 42,
      pattern = 42;

    spyOn(K.Internals.check, 'checkExactValue');

    K.check(value, pattern);

    expect(cEV).toHaveBeenCalledWith(value, pattern);
    expect(cEV.calls.count()).toEqual(1);
  });
};
