let warnedAboutMatchInteger = false,
    warnedAboutMatchIncompatibilities = false,
    warnedAboutMatchOneOf = false;

let primitiveMap = new Map();
primitiveMap.set(Boolean, 'boolean');
primitiveMap.set(Number, 'number');
primitiveMap.set(String, 'string');
primitiveMap.set(Function, 'function');
primitiveMap.set(Object, 'object');
//These two values are not actually used
primitiveMap.set(undefined, 'undefined');
primitiveMap.set(null, 'null');


// NOTE: Define beautifyPattern and beautifyValue on K?
/**
 * Turn a pattern into an elegant string
 * @private
 * @param  {*} pattern Pattern to turn to string
 * @return {String}         Elegant string
 */
function beautifyPattern(pattern) {
  //Legacy primitive patterns
  if(primitiveMap.has(pattern)) {
    return `${primitiveMap.get(pattern)}`;
  }
  //Legacy constructor pattern
  if(_.isFunction(pattern)) {
    return `function ${pattern.name? pattern.name : '(anonymous)'}`;
  }
  //Legacy array pattern
  if(_.isArray(pattern)) {
    return `[${beautifyPattern(pattern[0])}]`;
  }
  //Legacy Match.OneOf pattern
  if(_.isArray(pattern.choices)) {
    return `OneOf[${_.reduce(pattern.choices,
      (accu, entry) => `${accu}, ${beautifyPattern(entry)}`,
      ''
    ).slice(2)}]`;
  }

  return 'Unknown pattern';
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
  return value;
}

K.check = function KCheck(value, pattern) {
  let errorPrefix = '[K.check]';

  //PRIMITIVE TESTS
  if(primitiveMap.has(pattern)) {
    if(pattern === null) {
      if(value !== null) {
        throw new Error(`${errorPrefix} Expected null, got ${typeof value}.`);
      }
      else {
        return;
      }
    }

    // NOTE: Special case:
    // typeof null === 'object'
    // While this may seem logical in some way, the native behaviour of
    // check() is to throw.
    // As such, check manually and throw for K.check(null, Object);
    if(value === null && pattern === Object) {
      throw new Error(`${errorPrefix} Expected object, got null.`);
    }

    if(typeof value !== primitiveMap.get(pattern)) {
      throw new Error(`${errorPrefix} Expected ${beautifyPattern(pattern)}, got ${typeof value}.`);
    }

    return;
  }

  //Special legacy Match patterns
  let matchAny = ['__any__'],
      matchInteger = ['__integer__'];

  if(_.isEqual(pattern, matchAny)) return;

  if(_.isEqual(pattern, matchInteger)) {
    if(console.warn && !warnedAboutMatchInteger) {
      console.warn(
        `Match.Integer is deprecated and inaccurate. Prefer using KP.Integer() from korrigans:k-pattern http://github.com/Korrigans/meteor-k-pattern`
      );
      warnedAboutMatchInteger = true;
    }
    if (typeof value !== "number") {
      throw new Error(`${errorPrefix} Expected integer number, got ${typeof value}`);
    }
    // NOTE: This is how it's done in legacy check package.
    // We could use more accurate strategies, but that would
    // break backward compatibility
    if((value | 0) !== value) {
      throw new Error(`${errorPrefix} Expected integer, got ${beautifyValue(value)}`);
    }

    return;
  }

  //Legacy array pattern, looking like [pattern]
  if(_.isArray(pattern)) {
    if(pattern.length > 1) {
      throw new Error(`${errorPrefix} Legacy check array patterns allow only one element!`);
    }
    if(!_.isArray(value)) {
      throw new Error(`${errorPrefix} Expected ${beautifyPattern(pattern)}, got ${beautifyValue(value)}`);
    }

    for(let entry of value) {
      KCheck(entry, pattern[0]);
    }

    return;
  }

  //Legacy Match.OneOf pattern
  if(pattern.choices) {
    if(!warnedAboutMatchOneOf) {
      console.warn(
        'It looks like you are using Match.OneOf.\n' +
        'K.Check tried to detect it, but might have misunderstood or conflicted.\n' +
        // TODO: Once it's done, replace with actual API method (Like KP.OneOf or something)
        'Prefer using korrigans:k-pattern http://github.com/Korrigans/k-pattern'
      );
      warnedAboutMatchOneOf = true;
    }
    let choices = pattern.choices,
        failedAttemps = 0;
    for(let subPattern of choices) {
      try {
        KCheck(value, subPattern);
      } catch (e) {
        failedAttemps++;
      }
    }
    //All attemps failed
    if(failedAttemps === choices.length) {
      // XXX: This is a terrible error, but we can't really do any better
      throw new Error(`Failed OneOf validation of ${beautifyValue(value)} with pattern ${beautifyPattern(pattern)}`);
    }
    return;
  }



  // XXX: Unrecoverable incompatibility with check
  // If pattern is either:
  //  - Match.Optional
  //  - Match.ObjectIncluding
  //  - Match.ObjectWithValues
  // There is no way we can differentiate them without including check.
  // Each uses the constructor pattern with a local variable, assigning
  // the same "pattern" field, making them indistinguishable.
  if(pattern.pattern && !warnedAboutMatchIncompatibilities) {
    if(!warnedAboutMatchIncompatibilities) {
      //Throw all the time instead?
      console.error(
        'K.check is incompatible with Match.Optional, Match.ObjectIncluding, ' +
        'and Match.ObjectWithValues due to a malfunction of the native check ' +
        'package. Instead, use korrigans:k-pattern http://github.com/Korrigans/meteor-k-pattern'
      );
      warnedAboutMatchIncompatibilities = true;
    }
    return;
  }


  //Nothing caught, unknown pattern
  throw new Error(`Unknown pattern!`);
};
