const cCF = K.Internals.check.checkCustomFunction;

describe('[k-check][Unit] checkCustomFunction', () => {
  it('should be a function', () => {
    const
      expected = 'function',
      actual = typeof cCF;

    expect(actual).toEqual(expected);
  });
});
