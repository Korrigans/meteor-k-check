describe('[k-check][Unit] K.Internals.check', () => {
  it('should be defined', () => {
    const
      expected = 'object',
      actual = typeof K.Internals.check;

    expect(actual).toEqual(expected);
  });
});
