describe('[k-check][Unit] K.check', () => {
  let matches = (value, pattern, message) => {
    it(message, (done) => {
      let error = null;
      try {
        K.check(value, pattern);
      }
      catch(e) {
        error = e;
      }

      if(error !== null) {
        done.fail(error);
      }
      else {
        done();
      }
    });
  };
  let fails = (value, pattern, message) => {
    it(message, (done) => {
      let error = null;
      try {
        K.check(value, pattern);
      }
      catch(e) {
        error = e;
      }

      if(error === null) {
        done.fail('Expected K.check to throw!');
      }
      else {
        done();
      }
    });
  };

  it('should be defined', () => {
    let expected = 'function',
        actual = typeof K.check;
    expect(actual).toEqual(expected);
  });

  /**
   * Primitive tests
   */
  describe('Primitive types', () => {
    let testAllTypes = () => {
      let primitiveMap = new Map();

      primitiveMap.set(Boolean, [
        true,
        false
      ]);
      primitiveMap.set(Number, [
        0,
        Infinity,
        Math.PI,
        -42,
        5e42,
        0b111000101,
        0x712E5AF7F8AC90,
        0725132133 //octal
      ]);
      primitiveMap.set(String, [
        '',
        'Korrigans invasion in your fridge',
        `${Math.PI / 42}`
      ]);
      primitiveMap.set(Function, [
        () => {},
        function(){},
        Object
      ]);
      primitiveMap.set(Object, [
        {},
        Object.create({}),
        new Date()
      ]);
      primitiveMap.set(undefined, [
        undefined
      ]);
      primitiveMap.set(null, [
        null
      ]);

      describe('matches', () => {
        for(let type of primitiveMap.keys()) {
          for(let testCase of primitiveMap.get(type)) {
            matches(testCase, type, `${testCase} is a ${type}`);
          }
        }
      });
    };

    testAllTypes();

    /*
    matches(0, Number, '0 is a number');
    matches(Infinity, Number, 'Infinity is a number');
    matches(Math.PI, Number, 'Math.PI is a number');
    matches(-42, Number, '-42 is a number');

    matches('', String, `'' is a String`);
    matches(`I'm a String`, String, `"I'm a String" is a String`);
    matches('Korrigans', String, `'Korrigans' is a String`);

    matches(true, Boolean, 'true is a Boolean');
    matches(false, Boolean, 'false is a Boolean');

    matches(() => {}, Function, '() => {} is a function');
    matches(function() {}, Function, 'function() {} is a function');
    matches(matches, Function, 'matches is a function');

    matches({}, Object, '{} is an Object');
    matches(K, Object, 'K is an Object');

    matches(null, null, 'null is null');
    matches(undefined, undefined, 'undefined is undefined');
    */
    fails(function() {}, Object); //Compatibility with native Meteor check behaviour
  });
});
