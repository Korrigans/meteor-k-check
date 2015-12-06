let beautifiedPrimitives =  new Map();
beautifiedPrimitives.set(Boolean, 'boolean');
beautifiedPrimitives.set(Number, 'number');
beautifiedPrimitives.set(String, 'string');
beautifiedPrimitives.set(Function, 'function');
beautifiedPrimitives.set(Object, 'object');
beautifiedPrimitives.set(undefined, 'undefined');
beautifiedPrimitives.set(null, 'null');

/**
 * Turn a pattern into an elegant string
 * @private
 * @param  {*} pattern Pattern to turn to string
 * @return {String}         Elegant string
 */
 function beautifyPattern(pattern) {
   //Legacy primitive patterns
   if(beautifiedPrimitives.has(pattern)) {
     return `${beautifiedPrimitives.get(pattern)}`;
   }
   //Legacy constructor pattern
   if(_.isFunction(pattern)) {
     return pattern.name? `function ${pattern.name}` : 'anonymous function';
   }
   //Legacy array pattern
   if(_.isArray(pattern)) {
     return `Array[${beautifyPattern(pattern[0])}]`;
   }
   //Legacy Match.OneOf pattern
   if(_.isArray(pattern.choices)) {
     return `Match.OneOf[${
       _.reduce(pattern.choices,
         (accu, entry) => `${accu}, ${beautifyPattern(entry)}`,
         ''
       ).slice(2) //Remove leading ', '
     }]`;
   }

   return pattern;
 }

/**
 * Turn a value into an elegant string
 * @private
 * @param  {*} value Value to turn into a string
 * @return {String}       Elegant string
 */
 function beautifyValue(value) {
   if(typeof value === 'string') {
     return `"${value}"`;
   }
   if(_.isArray(value)) {
     return `[${_.reduce(value,
       (accu, entry) => `${accu}, ${beautifyValue(entry)}`,
       ''
     ).slice(2)}]`;
   }
   if(_.isFunction(value)) {
     return value.name? `function ${value.name}` : 'anonymous function';
   }

   return _(value).toString();
 }

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
        done.fail(
          `Expected K.check to throw!\nvalue: ${beautifyValue(value)}\npattern: ${beautifyPattern(pattern)}`);
      }
      else {
        done();
      }
    });
  };

  let primitiveValues = new Map();
  primitiveValues.set(Boolean, [
    true,
    false
  ]);
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
    0725132133 //octal
  ]);
  primitiveValues.set(String, [
    '',
    'Korrigans invasion in your fridge',
    `${Math.PI / 42}`
  ]);
  primitiveValues.set(Function, [
    () => {},
    function(){},
    Object
  ]);
  primitiveValues.set(Object, [
    {},
    Object.create({}),
    new Date()
  ]);
  primitiveValues.set(undefined, [
    undefined
  ]);
  primitiveValues.set(null, [
    null
  ]);

  /**
   * Primitive tests
   */
  describe('Primitive types', () => {
    describe('matches', () => {
      for(let type of primitiveValues.keys()) {
        for(let testCase of primitiveValues.get(type)) {
          matches(testCase, type,
            `${beautifyValue(testCase)} is ${beautifyPattern(type)}`
          );
        }
      }
      let primitivesTests = _.flatten([
        primitiveValues.get(Boolean),
        primitiveValues.get(Number),
        primitiveValues.get(String)
      ]);
      for(let testCase of primitivesTests) {
        let beautifiedCase = beautifyValue(testCase);
        matches(testCase, testCase,
          `${beautifiedCase} is ${beautifiedCase}`
        );
      }

      //Test manually that NaN is a Number. Legacy behaviour. wtf.
      matches(NaN, Number, 'NaN is a number (..?)');
    });
    describe('fails', () => {
      for(let type of primitiveValues.keys()) {
        let allTypes = [];
        // XXX: Manually populate all types, Babel does not seem to like:
        //     allTypes = [...primitiveValues.keys()]
        // (Returns a MapIterator instead of an array)
        for(let primitiveType of primitiveValues.keys()) {
          allTypes.push(primitiveType);
        }

        let otherTypes = _.without(
          allTypes,
          type
        );

        for(let testCase of primitiveValues.get(type)) {
          for(let testType of otherTypes) {
            //Fuzzy test each value against all other existing types
            fails(testCase, testType,
              `${beautifyValue(testCase)} is not ${beautifyPattern(testType)}`
            );
          }
        }
      }
      let primitivesTests = _.flatten([
        primitiveValues.get(Boolean),
        primitiveValues.get(Number),
        primitiveValues.get(String)
      ]);
      for(let testCase of primitivesTests) {
        const testPatterns = _.without(primitivesTests, testCase);
        for(let testPattern of testPatterns) {
          fails(testCase, testPattern,
            `${beautifyValue(testCase)} is not ${beautifyValue(testPattern)}`
          );
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
        for(let type of primitiveValues.keys()) {
          for(let testCase of primitiveValues.get(type)) {
            matches(testCase, matchAny,
              `Match.Any allows ${beautifyValue(testCase)} of type ${beautifyPattern(matchAny)}`
            );
          }
        }
      });
    });

    describe('Match.Integer', () => {
      let
        testNumbers = primitiveValues.get(Number),
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
        let otherTypes;
        for(let nonInteger of nonIntegers) {
          fails(nonInteger, matchInteger,
            `Match.Integer does not allow ${nonInteger}`
          );
        }

        otherTypes = [];
        for(let type of primitiveValues.keys()) {
          if(type !== Number) {
            otherTypes.push(type);
          }
        }

        for(let testType of otherTypes) {
          for(let testCase of primitiveValues.get(testType)) {
            fails(testCase, matchInteger,
              `Match.Integer does not allow ${beautifyValue(testCase)} of type ${beautifyPattern(matchInteger)}`
            );
          }
        }
      });
    });

    describe('Match.OneOf', () => {
      let testTypes = [Boolean, Function];
      let testPattern = Match.OneOf(...testTypes);

      describe('matches', () => {
        for(let testType of testTypes) {
          for(let testCase of primitiveValues.get(testType)) {
            matches(testCase, testPattern,
              `Match.OneOf allows ${beautifyValue(testCase)} with ${beautifyPattern(testPattern)}`
            );
          }
        }
      });

      describe('fails', () => {
        let allTypes = [];
        for(let type of primitiveValues.keys()) {
          allTypes.push(type);
        }
        let otherTypes = _.difference(allTypes, testTypes);
        for(let testType of otherTypes) {
          for(let testCase of primitiveValues.get(testType)) {
            fails(testCase, testPattern,
              `Match.OneOf does not allow ${beautifyValue(testCase)} with ${beautifyPattern(testPattern)}`
            );
          }
        }
      });
    });
  });

  describe('Legacy array patterns', () => {
    describe('matches', () => {
      for(let type of primitiveValues.keys()) {
        let testCase = primitiveValues.get(type);
        matches(testCase, [type],
          `${beautifyValue(testCase)} is ${beautifyPattern([type])}`
        );
      }
    });

    describe('fails', () => {
      let allTypes = [];
      // XXX: Manually populate all types, Babel does not seem to like:
      //     allTypes = [...primitiveValues.keys()]
      // (Returns a MapIterator instead of an array)
      for(let primitiveType of primitiveValues.keys()) {
        allTypes.push(primitiveType);
      }

      for(let type of primitiveValues.keys()) {
        let otherTypes = _.without(
          allTypes,
          type
        );
        for(let otherType of otherTypes) {
          let testCase = primitiveValues.get(otherType);
          let testType = [type];
          fails(testCase, testType,
            `${beautifyValue(testCase)} is not ${beautifyPattern(testType)}`
          );
        }
      }
    });
  });

  describe('Legacy plain object patterns', () => {
      describe('matches', () => {
        const
          testValue = {
            booleanValue : primitiveValues.get(Boolean)[0],
            numberValue : primitiveValues.get(Number)[0],
            stringValue : primitiveValues.get(String)[0],
            functionValue : primitiveValues.get(Function)[0],
            objectValue : primitiveValues.get(Object)[0],
            undefinedValue : primitiveValues.get(undefined)[0],
            nullValue : primitiveValues.get(null)[0]
          },
          testPattern = {
            booleanValue : Boolean,
            numberValue : Number,
            stringValue : String,
            functionValue : Function,
            objectValue : Object,
            undefinedValue : undefined,
            nullValue : null
          };

        matches(testValue, testPattern,
          `plain object with fields matches plain object with similar patterns`
        );
      });
      describe('fails', () => {
        it('should fail when value is not an object', () => {
          const
            testValue = 'foo',
            testPattern = {
              foo : String
            };
            expect(
              () => K.check(testValue, testPattern)
            ).toThrowError(Error);
        });
        it('should fail when there is too few fields', () => {
          const
            testValue = {
              foo : 'text'
            },
            testPattern = {
              foo : String,
              bar : Number,
              baz : null
            }
          expect(
            () => K.check(testValue, testPattern)
          ).toThrowError(Error,
            new RegExp('missing')
          );
        });
        it('should fail when there is too many fields', () => {
          const
            testValue = {
              foo : 'text',
              bar : 123,
              baz : undefined
            },
            testPattern = {
              foo : String
            }
          expect(
            () => K.check(testValue, testPattern)
          ).toThrowError(Error,
            new RegExp('excess')
          );
        });
        it('should fail when fields are not conform with pattern', () => {
          const
            testValue = {
              foo : 123
            },
            testPattern = {
              foo : String
            };
            expect(
              () => K.check(testValue, testPattern)
            ).toThrowError(Error,
              new RegExp('Expected string, got 123')
            );
        });
      });
  });

  describe('Custom function tests', () => {
    it('should define a special Symbol', () => {
      const
        expected = typeof Symbol(),
        actual = typeof K.check.custom;

      // NOTE: On old browser and Node v0.10.40 (used by Meteor 1.2.1),
      // typeof Symbol() === 'object' due to Babel's polyfill
      // On modern technologies, typeof Symbol() === 'symbol'
      expect(actual).toEqual(expected);
    });

    it('should use this Symbol when running a check', () => {
      const
        testFunc = jasmine.createSpy('testFunc'),
        testPattern = { [K.check.custom] : testFunc },

        // NOTE: We're testing against a bare function, value is not important
        testValue = 'some test value';

      K.check(testValue, testPattern);

      expect(testFunc).toHaveBeenCalledWith(testValue);
      expect(testFunc.calls.count()).toEqual(1);
    });

    it('shoud propagate error thrown by custom function', () => {
      const
        testErrorMessage = 'Something went right',
        testError = Error(testErrorMessage),
        testPattern = {
          [K.check.custom] : () => { throw testError; }
        },

        // NOTE: We're throwing an error anyway, value is not important
        testValue = 'some test value';

      expect(
        () => K.check(testValue, testPattern)
      ).toThrowError(Error, testErrorMessage);
    });

    it('should throw an error if custom function is not function', () => {
      const
        testPattern = {
          [K.check.custom] : 'not a function'
        },

        // NOTE: We're expecting K.check to go bonk, value is not important
        testValue = 'some test value';

      expect(
        () => K.check(testValue, testPattern)
      ).toThrowError(Error,
        '[K.check] Expected custom function to be a function, got string'
      );
    });
  });
});
