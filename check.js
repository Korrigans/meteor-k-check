const primitiveMap = new Map();
// NOTE: These first values are used to test against the typeof operator
primitiveMap.set(Boolean, 'boolean');
primitiveMap.set(Number, 'number');
primitiveMap.set(String, 'string');
primitiveMap.set(Function, 'function');
primitiveMap.set(Object, 'object');
// NOTE: These two last values are only used for beautification purposes
primitiveMap.set(undefined, 'undefined');
primitiveMap.set(null, 'null');

const errorPrefix = '[K.check]';

let
  warnedAboutMatchInteger = false,
  warnedAboutMatchIncompatibilities = false,
  warnedAboutMatchOneOf = false;

// NOTE: Define beautifyPattern and beautifyValue on K?
/**
 * Turn a pattern into an elegant string
 * @private
 * @param  {*} pattern Pattern to turn to string
 * @return {String}    Elegant string
 */
function beautifyPattern(pattern) {
  //Legacy primitive patterns
  if(primitiveMap.has(pattern)) {
    return `${primitiveMap.get(pattern)}`;
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
 * @return {String}  Elegant string
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

/**
 * Error factory, generates a pretty error message
 * @private
 * @param  {*} value   Value to use when generating error
 * @param  {*} pattern Pattern to use when generating error
 * @return {Error}     Generated error
 */
function buildCheckError(value, pattern) {
  const
    beautifiedPattern = beautifyPattern(pattern),
    beautifiedValue = beautifyValue(value),
    errorMessage =
      `${errorPrefix} Expected ${beautifiedPattern}, got ${beautifiedValue}.`;

  return new Error(errorMessage);
}

K.check = function KCheck(value, pattern) {
  //Special legacy Match patterns
  const
      matchAny = ['__any__'],
      matchInteger = ['__integer__'];


  if(_.isObject(pattern) && pattern[K.check.custom]) {
    const testFunc = pattern[K.check.custom];
    if(!_.isFunction(testFunc)) {
      throw new Error(
        `${errorPrefix} Expected custom function to be a function, got ${typeof testFunc}`
      );
    }

    testFunc(value);
    return;
  }

  //PRIMITIVE TESTS
  if(primitiveMap.has(pattern)) {
    checkForPrimitive(value, pattern);
    return;
  }

  //Match.Any
  if(_.isEqual(pattern, matchAny)) return;

  //Match.Integer
  if(_.isEqual(pattern, matchInteger)) {
    checkLegacyMatchInteger(value);
    return;
  }

  //Legacy array pattern, looking like [pattern]
  if(_.isArray(pattern)) {
    checkLegacyArray(value, pattern);
    return;
  }

  //Legacy Match.OneOf pattern
  if(pattern.choices) {
    checkLegacyMatchOneOf(value, pattern);
    return;
  }

  if(_.isObject(pattern)) {
    checkLegacyObject(value, pattern);
    return;
  }

  // NOTE: Unrecoverable incompatibility with check
  // If pattern is either:
  //  - Match.Optional
  //  - Match.ObjectIncluding
  //  - Match.ObjectWithValues
  // There is no way we can differentiate them without including check.
  // Each uses the constructor pattern with a local variable, assigning
  // the same "pattern" field, making them indistinguishable.
  if(pattern.pattern) {
    if(!warnedAboutMatchIncompatibilities) {
      //Throw all the time instead?
      console.error(
        'K.check is incompatible with Match.Optional, Match.ObjectIncluding, '
        + 'and Match.ObjectWithValues due to a malfunction of the native check '
        + 'package. Instead, use korrigans:k-pattern '
        + 'http://github.com/Korrigans/meteor-k-pattern'
      );
      warnedAboutMatchIncompatibilities = true;
    }
    return;
  }

  //Some legacy primitive values tests
  if (_.includes(['string', 'number', 'boolean'], typeof pattern)) {
    if (value !== pattern) {
      throw buildCheckError(value, pattern);
    }
    return;
  }

  //Nothing caught, unknown pattern
  throw new Error(`${errorPrefix} Unknown pattern ${beautifyPattern(pattern)}`);
};

/**
 * Check a value against a primitive type
 * @param  {*} value   Value to check against pattern
 * @param  {*} pattern Legacy primitive pattern to check with
 * @throws {Error} Value was not conform to pattern
 */
function checkForPrimitive(value, pattern) {
  if(value === null && pattern === null) return;

  if(
    // NOTE: Special case:
    // typeof null === 'object'
    // While this may seem logical in some way, the native behaviour of
    // check() is to throw when used like check(null, Object).
    // As such, check manually and throw for K.check(null, Object);
    !(pattern === Object && value === null)
    && (typeof value === primitiveMap.get(pattern))
  ) return;

  throw buildCheckError(value, pattern);
}

/**
 * Check value against legacy Match.Integer pattern
 * @param  {*} value Value to check
 * @throws {Error} Value was not conform to pattern
 */
function checkLegacyMatchInteger(value) {
  if(console.warn && !warnedAboutMatchInteger) {
    console.warn(
      'Match.Integer is deprecated and inaccurate. '
      + 'Prefer using KP.Integer() from korrigans:k-pattern '
      + 'http://github.com/Korrigans/meteor-k-pattern'
    );
    warnedAboutMatchInteger = true;
  }

  // NOTE: This is how it's done in legacy check package.
  // We could use more accurate strategies, but that would
  // break backward compatibility
  if (
    typeof value === "number"
    && (value | 0) === value
  ) return;

  throw buildCheckError(value, 'Match.Integer');
}

/**
 * Check value against legacy pattern
 * @param  {*} value   Value to check
 * @param  {*[]} pattern Legacy array pattern, like [String]
 * @throws {Error}  Value was not conform to pattern
 */
function checkLegacyArray(value, pattern) {
  if(pattern.length > 1) {
    throw new Error(
      `${errorPrefix} Legacy check array patterns allow only one element!`
    );
  }
  if(!_.isArray(value)) {
    throw buildCheckError(value, pattern);
  }

  for(let entry of value) {
    K.check(entry, pattern[0]);
  }
}

function checkLegacyMatchOneOf(value, pattern) {
  if(!warnedAboutMatchOneOf) {
    console.warn(
      'It looks like you are using Match.OneOf.\n' +
      'K.Check tried to detect it, but might have misunderstood or conflicted.\n' +
      // TODO: Once it's done, replace with actual API method (Like KP.OneOf or something)
      'Prefer using korrigans:k-pattern http://github.com/Korrigans/k-pattern'
    );
    warnedAboutMatchOneOf = true;
  }
  const choices = pattern.choices;
  let failedAttemps = 0;

  for(let subPattern of choices) {
    try {
      K.check(value, subPattern);
    } catch (e) {
      if(!_.contains(e.message, errorPrefix)) {
        //Unknown error, propagate
        throw e;
      }
      failedAttemps++;
    }
  }
  //Did _all_ attemps fail?
  if(failedAttemps === choices.length) {
    throw buildCheckError(value, pattern);
  }
}

function checkLegacyObject(value, pattern) {

}
