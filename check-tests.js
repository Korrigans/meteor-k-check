describe('[k-check][Unit] K.check', () => {
  it('should be defined', () => {
    let expected = 'function',
        actual = typeof K.check;
    expect(actual).toEqual(expected);
  });

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

  let primitiveMap = new Map();
  primitiveMap.set(Boolean, [
    true,
    false
  ]);
  primitiveMap.set(Number, [
    0,
    Infinity,
    Math.PI,
    0.1 + 0.2,
    -2.5 * Math.PI,
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

  /**
   * Primitive tests
   */
  describe('Primitive types', () => {
    describe('matches', () => {
      for(let type of primitiveMap.keys()) {
        for(let testCase of primitiveMap.get(type)) {
          matches(testCase, type,
            `${type === String? `"${testCase}"` : testCase} is ${type && type.name}`
          );
        }
      }
    });
    describe('fails', () => {
      for(let type of primitiveMap.keys()) {
        let allTypes = [];
        // XXX: Manually populate all types, Babel does not seem to like:
        //     allTypes = [...primitiveMap.keys()]
        // (Returns a MapIterator instead of an array)
        for(let primitiveType of primitiveMap.keys()) {
          allTypes.push(primitiveType);
        }

        let otherTypes = _.without(
          allTypes,
          type
        );

        for(let testCase of primitiveMap.get(type)) {
          for(let testType of otherTypes) {
            //Fuzzy test each value against all other existing types
            fails(testCase, testType,
              `${type === String? `"${testCase}"` : testCase} is not ${testType && testType.name}`
            );
          }
        }
      }
    });
  });

  describe('Special Match patterns', () => {
    let matchAny = Match.Any,
        matchInteger = Match.Integer;

    describe('Match.any', () => {
      describe('matches', () => {
        //Test if everything passes with Match.Any
        for(let type of primitiveMap.keys()) {
          for(let testCase of primitiveMap.get(type)) {
            matches(testCase, matchAny,
              `Match.Any allows ${type === String? `"${testCase}"` : testCase} of type ${type && type.name}`
            );
          }
        }
      });
    });

    describe('Match.Integer', () => {
      let
        testNumbers = primitiveMap.get(Number),
        // NOTE: While this may seem incorrect with methods like
        // Number.isInteger, this is done to keep the legacy behaviour of check
        integers = testNumbers.filter((n) => (n | 0) === n),

        nonIntegers = _.without(testNumbers, ...integers);

      describe('matches', () => {
        for(let integer of integers) {
          matches(integer, matchInteger,
            `Match.Integer allows ${integer}`
          );
        }
      });
      describe('fails', () => {
        let otherTypes = [];
        for(let nonInteger of nonIntegers) {
          fails(nonInteger, matchInteger,
            `Match.Integer does not allow ${nonInteger}`
          );
        }

        for(let type of primitiveMap.keys()) {
          if(type !== Number) {
            otherTypes.push(type);
          }
        }

        for(let testType of otherTypes) {
          for(let testCase of primitiveMap.get(testType)) {
            fails(testCase, matchInteger,
              `Match.Integer does not allow ${testType === String? `"${testCase}"` : testCase} of type ${testType && testType.name}`
            );
          }
        }
      });
    });
  });
});
