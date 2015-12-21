describe('[k-check][Integration] buildCheckError vs K.ErrorLog', () => {
  it('should populate K.ErrorLog when check has a deep path', () => {
    const
      value = {
        foo: [{
          bar: [0]
        }]
      },
      pattern = {
        foo: [{
          bar: [String]
        }]
      },
      deepness = 4;

    // NOTE: We know it's going to fail, catch the thing
    try {
      K.check(value, pattern);
    }
    catch (e) {
      _.noop();
    }

    const lastLogEntry = _.last(K.ErrorLog.Check);

    expect(typeof lastLogEntry.message).toEqual('string');
    expect(lastLogEntry.message).toEqual(
      // Should technically test with ${beautifyValue(pattern.foo[0].bar...)}
      `Expected string, got 0 at index 0 of [0] against [string]`
    );
    expect(lastLogEntry.path.length).toEqual(deepness - 1);

    expect(lastLogEntry.path[0]).toEqual(
      `key foo of ${
        beautifyValue(value)
      } against ${
        beautifyPattern(pattern)
      }`
    );
    expect(lastLogEntry.path[1]).toEqual(
      `index 0 of ${
        beautifyValue(value.foo)
      } against ${
        beautifyPattern(pattern.foo)
      }`
    );
    expect(lastLogEntry.path[2]).toEqual(
      `key bar of ${
        beautifyValue(value.foo[0])
      } against ${
        beautifyPattern(pattern.foo[0])
      }`
    );
  });
});
