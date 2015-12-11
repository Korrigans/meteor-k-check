describe('[k-check][k-debug][Unit] K.Internals.check', () => {
  it('should be defined on tests', () => {
    const
      expected = 'object',
      actual = typeof K.Internals.check;

    expect(actual).toEqual(expected);
  });
});
