# meteor-k-check
*koriggans:k-check*

[**Korrigans**](https://github.com/Korrigans)'s own validation package and function `K.check`.  
Mostly compatible with native `check` package (see [limitations](#limitations)).

Offers better error reporting and extensibility than the native package.

## Table of Contents

- [Installation](#installation)
- [Use](#use)
- [Advanced](#advanced)
- [Limitations](#limitations)
- [Dependants](#dependants)
- [Testing](#testing)
- [Contributors](#contributors)
- [License](#license)

## Installation

In your Meteor app directory, enter:

    $ meteor add koriggans:k-check

In your package:

    api.use('korrigans:k-check@0.1.0')

## Use

Use the package through `K.check`:

    K.check(42, Number)

You can use almost all legacy check patterns:

    K.check('foo', String)
    K.check(new Error('message'), Error)
    K.check(20, Match.Where(value => value % 5 === 0))
    K.check('exact value', 'exact value')
    K.check(true, Match.OneOf(42, true))
    K.check({ foo : 0 }, { foo : Number })
    K.check([3, 6, 9], [Number])

You can also extend the possibilities of `K.check` by defining your own patterns and test functions.

## Advanced

To allow the use of custom functions `K.check` provides a Symbol to be placed on objects: `K.check.custom`.  
`K.check` expects a function to be set on this specific symbol.  
To use custom tests use this Symbol on objects:

    myObject[K.check.custom] = value => runTest(value)
    // Or:
    myObject[K.check.custom] = runTest

You may then use your object as a pattern:

    K.check('some value', myObject)

The custom function overrides all native behaviours of `K.check`.  
Contrary to `Match.Where` the return value is discarded. Returning a falsey value will not fail the test.

## Limitations

`Match.Optional`, `Match.ObjectIncluding` and `Match.ObjectWithValues` are not supported.

`K.check` uses duck typing to figure out which legacy patterns are passed. For example, if a passed pattern has a `condition` method then it is probably a `Match.Where` instance.  
This is not possible with the three above legacy patterns. All three shadow each other with [the same `pattern` field](https://github.com/meteor/meteor/blob/devel/packages/check/match.js#L111-L131). Due to this limitation, they are indistinguishable from the outside.

## Dependants

- [meteor-k-pattern](https://github.com/Korrigans/meteor-k-pattern) alias *koriggans:k-pattern*

## Testing
In your Meteor app directory, clone the package files in `packages`:

    $ git clone https://github.com/Korrigans/meteor-k-check

Then start the tests:

    $ set VELOCITY_TEST_PACKAGES=1
    $ meteor test-packages --driver-package velocity:html-reporter korrigans:k-check

## Contributors
- **MrLowkos**: [@github](https://github.com/MrLowkos) - [@atmosphere](https://atmospherejs.com/mrlowkos)
- **Aralun**: [@github](https://github.com/Aralun) - [@atmosphere](https://atmospherejs.com/aralun)

## License

[MIT](../master/LICENSE)
