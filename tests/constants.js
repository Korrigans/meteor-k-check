// Bring back beautifiers for pretty test descriptions
[beautifyValue, beautifyPattern]
 = [K.Internals.check.beautifyValue, K.Internals.check.beautifyPattern];

matches = (value, pattern, message) => {
  it(message, done => {
    let error = null;

    try {
      K.check(value, pattern);
    }
    catch (e) {
      error = e;
    }

    if (error === null) {
      done();
    }
    else {
      done.fail(error);
    }
  });
};

fails = (value, pattern, message) => {
  it(message, done => {
    let error = null;

    try {
      K.check(value, pattern);
    }
    catch (e) {
      error = e;
    }

    if (error === null) {
      done.fail(
        `Expected K.check to throw!\n`
        + `value: ${beautifyValue(value)}\n`
        + `pattern: ${beautifyPattern(pattern)}`
      );
    }
    else {
      const
        logEntry = _.last(K.ErrorLog.Check),
        actual = _.includes(error.message, logEntry.message),
        expected = true;

      expect(actual).toEqual(expected);
      done();
    }
  });
};

primitiveValues = new Map();

primitiveValues.set(Boolean, [
  true,
  false
]);

/*
  eslint no-magic-numbers: 0
 */
primitiveValues.set(Number, [
  0,
  Infinity,
  Math.PI,
  0.1 + 0.2,
  -2.5 * Math.PI,
  -42,
  5e42,
  0b111000101,
  0x712E5AF7F8AC90,
  0o725132133
]);

primitiveValues.set(String, [
  '',
  'Korrigans invasion in your fridge',
  `${Math.PI / 42}`
]);

primitiveValues.set(Function, [
  () => ({}),
  function noop() {},
  Object
]);
primitiveValues.set(Object, [
  {},
  _.create({}),
  new Date()
]);
primitiveValues.set(undefined, [
  undefined
]);
primitiveValues.set(null, [
  null
]);

matchAny = Match.Any;
matchInteger = Match.Integer;
