describe('[k-check][k-debug][Unit] K.Internals.check.primitiveMap', () => {
  it('should be defined on tests', () => {
    const
      expected = true,
      actual = K.Internals.check.primitiveMap instanceof Map;

    expect(actual).toEqual(expected);
  });
});
