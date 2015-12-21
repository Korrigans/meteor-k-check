const bCE = K.Internals.check.buildCheckError;

describe('[k-check][Unit] buildCheckError', () => {
  it('should be a function', () => {
    const
      expected = 'function',
      actual = typeof bCE;

    expect(actual).toEqual(expected);
  });

  it('should return an Error', () => {
    const
      actual = _.isError(bCE()),
      expected = true;

    expect(actual).toEqual(expected);
  });

  describe('path', () => {
    afterEach(() => {
      while (bCE.path.length > 0) {
        bCE.path.pop();
      }
    });
    it('should be an array', () => {
      const
        actual = _.isArray(bCE.path),
        expected = true;

      expect(actual).toEqual(expected);
    });

    describe('lock', () => {
      it('should be function', () => {
        const
          expected = 'function',
          actual = typeof bCE.path.lock;

        expect(actual).toEqual(expected);
      });
      it('should be non-enumerable', () => {
        const
          actual = Object.getOwnPropertyDescriptor(bCE.path, 'lock').enumerable,
          expected = false;

        expect(actual).toEqual(expected);
      });
      it('should create a "locked" boolean field on last path element', () => {
        const mock = {};

        bCE.path.push(mock);

        bCE.path.lock();

        const
          actual = _.last(bCE.path).locked,
          expected = true;

        expect(actual).toEqual(expected);
      });
      describe('errors', () => {
        it('should throw if path empty or last element already locked', () => {
          expect(bCE.path.lock).toThrowError(
            Error, /corrupted path/
          );

          const mock = {};

          bCE.path.push(mock);
          bCE.path.lock();

          expect(bCE.path.lock).toThrowError(
            Error, /corrupted path/
          );
        });
      });
    });
    describe('unlock', () => {
      it('should be function', () => {
        const
          expected = 'function',
          actual = typeof bCE.path.unlock;

        expect(actual).toEqual(expected);
      });
      it('should be non-enumerable', () => {
        const
          actual
            = Object.getOwnPropertyDescriptor(bCE.path, 'unlock').enumerable,
          expected = false;

        expect(actual).toEqual(expected);
      });
      it('should create a "locked" boolean field on last path element', () => {
        const mock = {};

        bCE.path.push(mock);

        bCE.path.lock();

        bCE.path.unlock();

        const
          actual = typeof _.last(bCE.path).locked,
          expected = 'undefined';

        expect(actual).toEqual(expected);
      });
      describe('errors', () => {
        it('should throw if there is no element to unlock', () => {
          expect(bCE.path.unlock).toThrowError(
            Error, /corrupted path/
          );

          const mock = {};

          bCE.path.push(mock);

          expect(bCE.path.unlock).toThrowError(
            Error, /corrupted path/
          );
        });
      });
    });

    describe('removeLast', () => {
      it('should be function', () => {
        const
          expected = 'function',
          actual = typeof bCE.path.removeLast;

        expect(actual).toEqual(expected);
      });
      it('should be non-enumerable', () => {
        const
          actual
            = Object.getOwnPropertyDescriptor(bCE.path, 'removeLast')
                .enumerable,
          expected = false;

        expect(actual).toEqual(expected);
      });
      it('should remove last element from path', () => {
        const mock = {};

        bCE.path.push(mock);

        bCE.path.removeLast();

        const
          actual = _.isEmpty(bCE.path),
          expected = true;

        expect(actual).toEqual(expected);
      });
      it('should not remove last element if it is locked', () => {
        const mock = {};

        bCE.path.push(mock);
        bCE.path.lock();

        bCE.path.removeLast();

        const
          actual = _.last(bCE.path),
          expected = mock;

        expect(actual).toEqual(expected);
      });
    });
  });

  describe('error message', () => {
    const baseErrorMessage = bCE().message;

    it('should contain [K.check]', () => {
      const
        actual = _.includes(baseErrorMessage, '[K.check]'),
        expected = true;

      expect(actual).toEqual(expected);
    });
    it('should contain beautified value and pattern', () => {
      const
        value = { foo: ['some test value'] },
        pattern = { bar: Boolean },
        errorMessage = bCE(value, pattern).message,

        actual = _.includes(errorMessage, beautifyValue(value))
              && _.includes(errorMessage, beautifyPattern(pattern)),
        expected = true;

      expect(actual).toEqual(expected);
    });
    describe('path', () => {
      it('should extract and use data in path', () => {
        // Mock path data
        const mock = {
          direction: 'somewhere',
          of: 'korrigans valley',
          against: 'the entire world!'
        };

        bCE.path.push(mock);

        const
          value = 'foo',
          pattern = String,
          errorMessage = bCE(value, pattern).message,

          actual = _.includes(errorMessage, mock.direction)
                && _.includes(errorMessage, beautifyValue(mock.of))
                && _.includes(errorMessage, beautifyPattern(mock.against)),
          expected = true;

        expect(actual).toEqual(expected);

        // Safety against below test
        expect(!_.includes(errorMessage, 'K.ErrorLog')).toEqual(true);
      });
      it('should contain K.ErrorLog if path has more than one element', () => {
        // Mock path data
        const mock = {
          direction: 'somewhere',
          of: 'korrigans valley',
          against: 'the entire world!'
        };

        bCE.path.push(mock, mock);

        const
          value = 'foo',
          pattern = String,
          errorMessage = bCE(value, pattern).message,

          actual = _.includes(errorMessage, 'K.ErrorLog'),
          expected = true;

        expect(actual).toEqual(expected);
      });
    });
  });
});
