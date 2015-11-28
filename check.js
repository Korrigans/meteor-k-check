K.check = function KCheck(value, pattern) {
  let errorPrefix = '[K.check]',
      primitiveMap = new Map();

  primitiveMap.set(Boolean, 'boolean');
  primitiveMap.set(Number, 'number');
  primitiveMap.set(String, 'string');
  primitiveMap.set(Function, 'function');
  primitiveMap.set(Object, 'object');
  //These two values are not actually used
  primitiveMap.set(undefined, 'undefined');
  primitiveMap.set(null, 'null');

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
      throw new Error(`${errorPrefix} Expected ${primitiveMap.get(pattern)}, got ${typeof value}.`);
    }
  }
};
