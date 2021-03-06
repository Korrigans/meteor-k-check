const cLO = K.Internals.check.Patterns.checkLegacyObject;

describe('[k-check][Unit] checkLegacyObject', () => {
  it('should be a function', () => {
    const
      expected = 'function',
      actual = typeof cLO;

    expect(actual).toEqual(expected);
  });
  it('should call K.check for each key with pattern and value', () => {
    spyOn(K, 'check');

    const
      testPattern = { foo: String, bar: Boolean },
      testValue = { foo: 'foo', bar: true };

    cLO(testValue, testPattern);

    expect(K.check).toHaveBeenCalledWith('foo', String);
    expect(K.check).toHaveBeenCalledWith(true, Boolean);
  });
  describe('matches', () => {
    const
      testValue = {
        booleanValue: primitiveValues.get(Boolean)[0],
        numberValue: primitiveValues.get(Number)[0],
        stringValue: primitiveValues.get(String)[0],
        functionValue: primitiveValues.get(Function)[0],
        objectValue: primitiveValues.get(Object)[0],
        undefinedValue: primitiveValues.get(undefined)[0],
        nullValue: primitiveValues.get(null)[0]
      },
      testPattern = {
        booleanValue: Boolean,
        numberValue: Number,
        stringValue: String,
        functionValue: Function,
        objectValue: Object,
        undefinedValue: undefined,
        nullValue: null
      };

    matches(cLO, testValue, testPattern,
        `plain object with fields matches plain object with similar patterns`
      );
  });
  describe('fails', () => {
    it('should fail when value is not an object', () => {
      const testValue = 'foo',
        testPattern = {
          foo: String
        };

      expect(
        () => cLO(testValue, testPattern)
      ).toThrowError(Error);
    });
    it('should fail when there is too few fields', () => {
      const testValue = {
          foo: 'text'
        },
        testPattern = {
          foo: String,
          bar: Number,
          baz: null
        };

      expect(
        () => cLO(testValue, testPattern)
      ).toThrowError(Error,
        new RegExp('missing')
      );
    });
    it('should fail when there is too many fields', () => {
      const testValue = {
          foo: 'text',
          bar: 123,
          baz: undefined
        },
        testPattern = {
          foo: String
        };

      expect(
        () => cLO(testValue, testPattern)
      ).toThrowError(Error,
        new RegExp('excess')
      );
    });
    it('should fail when fields are not conform with pattern', () => {
      const testValue = {
          foo: 123
        },
        testPattern = {
          foo: String
        };

      expect(
        () => cLO(testValue, testPattern)
      ).toThrowError(Error,
        new RegExp('Expected string, got 123')
      );
    });
  });
});
