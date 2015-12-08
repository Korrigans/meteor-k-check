primitiveMap = new Map();

// NOTE: These first values are used to test against the typeof operator
primitiveMap.set(Boolean, 'boolean');
primitiveMap.set(Number, 'number');
primitiveMap.set(String, 'string');
primitiveMap.set(Function, 'function');
primitiveMap.set(Object, 'object');
// NOTE: These two last values are only used for beautification purposes
primitiveMap.set(undefined, 'undefined');
primitiveMap.set(null, 'null');
