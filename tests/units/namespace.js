describe('[k-check][Unit] K.check', () => {
  it('should be defined', () => {
    const expected = 'function',
      actual = typeof K.check;

    expect(actual).toEqual(expected);
  });
});
