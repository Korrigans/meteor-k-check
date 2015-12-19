describe('[k-check][End-to-end] K.check', () => {
  const percentagePattern = {
    min: 0,
    max: 100,
    // Magic happens here:
    [K.check.custom](value) {
      if (!Number.isFinite(value)) {
        throw new Error('value not finite number');
      }
      if (value < this.min) {
        throw new Error('number too small');
      }
      if (value > this.max) {
        throw new Error('number too big');
      }
      // Return value is discarded, no need to provide one
    }
  };

  const todayDate = new Date();

  todayDate[K.check.custom] = function createdToday(value) {
    if (!_.isDate(value)) {
      throw new Error('value is not a Date instance');
    }
    if (value.getDate() !== this.getDate()) {
      throw new Error('value does not correspond to today');
    }
  };

  const pattern = {
    title: String,
    creationDate: todayDate,
    author: {
      username: String,
      friends: [{
        username: String,
        friendLevel: percentagePattern
      }],
      birthDate: Date,
      hungry: Boolean
    }
  };

  it('should validate this big stuff', () => {
    const value = {
      title: 'Why are Korrigans so handsome',
      creationDate: new Date(),
      author: {
        username: 'The Tribe',
        friends: [{
          username: 'Humanity',
          friendLevel: 1
        }, {
          username: 'Mermaids',
          friendLevel: 98
        }],
        birthDate: new Date('1980'),
        hungry: true
      }
    };

    expect(() => K.check(value, pattern)).not.toThrow();
  });

  // TODO: Test failures
});
