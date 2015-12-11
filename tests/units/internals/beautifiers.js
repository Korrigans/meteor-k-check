const
  bV = K.Internals.check.beautifyValue,
  bP = K.Internals.check.beautifyPattern,
  testCases = new Map(),
  valueTestCases = new Map(),
  patternTestCases = new Map();

function addTest(key, value, message) {
  testCases.set(key, [value, message]);
}

addTest(null, 'null', 'format null as null');
addTest(undefined, 'undefined', 'format undefined as undefined');
addTest(1, '1', 'format numbers as their string equivalent');
addTest(NaN, 'NaN', 'format NaN as its string equivalent');
addTest(-Infinity, '-Infinity', 'format Infinity as its string equivalent');
addTest(true, 'true', 'format Booleans as their string equivalent');

addTest(function() {}, 'anonymous function', 'format anonymous functions');
addTest(function someFunc() {},
  'function someFunc', 'format named functions');

addTest({ foo: { bar: null } }, '{ foo: { bar: null } }', 'format objects');

describe('[k-check][Unit] beautifyValue', () => {
  it('should be a function', () => {
    const
      expected = 'function',
      actual = typeof bV;

    expect(actual).toEqual(expected);
  });

  it('should return a String', () => {
    const
      expected = 'string',
      actual = typeof bV();

    expect(actual).toEqual(expected);
  });

  valueTestCases.set('foo', ['"foo"', 'enclose strings in double-quotes']);
  valueTestCases.set([1, 'foo', null], [
    '[1, "foo", null]', 'format arrays nicely'
  ]);
  valueTestCases.set({
    foo: null,
    bar: [{ baz: 'val' }, undefined]
  }, [
    '{ foo: null, bar: [{ baz: "val" }, undefined] }',
    'can format complex values'
  ]);

  function runValueTest(testCase, value, message) {
    it(`should ${message}`, () => {
      const
        expected = value,
        actual = bV(testCase);

      expect(actual).toEqual(expected);
    });
  }

  for (let test of testCases.keys()) {
    runValueTest(test, ...testCases.get(test));
  }
  for (let test of valueTestCases.keys()) {
    runValueTest(test, ...valueTestCases.get(test));
  }
});

describe('[k-check][Unit] beautifyPattern', () => {
  it('should be a function', () => {
    const
      expected = 'function',
      actual = typeof bP;

    expect(actual).toEqual(expected);
  });

  it('should return a String', () => {
    const
      expected = 'string',
      actual = typeof bP();

    expect(actual).toEqual(expected);
  });

  patternTestCases.set('foo', [
    'foo', 'not enclose strings in double-quotes'
  ]);
  patternTestCases.set(Match.OneOf(0, true), [
    'Match.OneOf(0, true)', 'format Match.OneOf'
  ]);
  patternTestCases.set({
    min: 0,
    max: 5,
    [K.check.custom]: function runTest() {}
  }, [
    'runTest CustomValidator{ min: 0, max: 5 }',
    'format custom check patterns'
  ]);

  // Add tests for each primitive type
  for (let type of K.Internals.check.primitiveMap.keys()) {
    patternTestCases.set(type, [
      K.Internals.check.primitiveMap.get(type),
      `format primitive type ${K.Internals.check.primitiveMap.get(type)}`
    ]);
  }

  patternTestCases.set([String], ['[string]', 'format arrays properly']);

  function runPatternTest(testCase, value, message) {
    it(`should ${message}`, () => {
      const
        expected = value,
        actual = bP(testCase);

      expect(actual).toEqual(expected);
    });
  }

  for (let test of testCases.keys()) {
    runPatternTest(test, ...testCases.get(test));
  }
  for (let test of patternTestCases.keys()) {
    runPatternTest(test, ...patternTestCases.get(test));
  }
});
