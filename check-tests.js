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

    
  });
});
