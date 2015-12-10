describe('[k-check][Unit] K.Internals.check.primitiveMap', () => {
  it('should be defined', () => {
    const
      expected = true,
      actual = K.Internals.check.primitiveMap instanceof Map;

    expect(actual).toEqual(expected);
  });
});
