# meteor-k-check

*koriggans:k-check*

[**Korrigans**][1]'s own argument checking and general pattern matching package
and function `K.check`. Mostly compatible with native [`check`][2] package
(see [limitations](#limitations)).

Offers better error reporting and extensibility than the native package.

## Table of Contents

-   [Installation](#installation)
-   [Use](#use)
-   [Advanced](#advanced)
-   [Limitations](#limitations)
-   [Dependants](#dependants)
-   [Testing](#testing)
-   [Contributors](#contributors)
-   [License](#license)

## Installation

In your Meteor app directory, enter:

    $ meteor add koriggans:k-check

In your package:

```javascript
api.use('korrigans:k-check@0.1.0')
```

## Use

Use the package through `K.check`:

```javascript
K.check(42, Number)
```

You can use almost all legacy check patterns:

```javascript
K.check('foo', String)
K.check(new Error('message'), Error)
K.check(20, Match.Where(value => value % 5 === 0))
K.check('exact value', 'exact value')
K.check(true, Match.OneOf(42, true))
K.check({ foo : 0 }, { foo : Number })
K.check([3, 6, 9], [Number])
```

You can also extend the possibilities of `K.check` by
defining your own patterns and test functions.

## Advanced

To allow the use of custom functions `K.check` provides a Symbol to be placed
on objects: `K.check.custom`.
`K.check` expects a function to be set on this specific symbol.
To use custom tests use this Symbol on objects:

```javascript
myObject[K.check.custom] = value => runTest(value)
// Or:
myObject[K.check.custom] = runTest
```

You may then use your object as a pattern:

```javascript
K.check('some value', myObject)
```

The custom function overrides all native behaviours of `K.check`.
Contrary to `Match.Where` the return value is discarded. Returning a falsey
value will not fail the test.

## Limitations

`Match.Optional`, `Match.ObjectIncluding` and `Match.ObjectWithValues` are not
supported.

`K.check` uses duck typing to figure out which legacy patterns are passed. For
example, if a passed pattern has a `condition` method then it is probably a
`Match.Where` instance.
This is not possible with the three above legacy patterns. All three shadow
each other with [the same `pattern` field][3]. Due to this limitation, they
are indistinguishable from the outside.

## Dependants

-   [meteor-k-pattern][4] alias *koriggans:k-pattern*
-   [meteor-k-schema][5] alias *koriggans:k-schema*

## Testing

In your Meteor app directory, clone the package files in `packages` folder:

    $ git clone https://github.com/Korrigans/meteor-k-check ./packages/meteor-k-check

Then start the tests:

    $ set VELOCITY_TEST_PACKAGES=1
    $ meteor test-packages --driver-package velocity:html-reporter korrigans:k-check

## Contributors

-   **MrLowkos**: [@github][6] - [@atmosphere][7]
-   **Aralun**: [@github][8] - [@atmosphere][9]

## License

[MIT](../master/LICENSE)

[1]: https://github.com/Korrigans
[2]: https://github.com/meteor/meteor/tree/devel/packages/check
[3]: https://github.com/meteor/meteor/blob/devel/packages/check/match.js#L111-L131
[4]: https://github.com/Korrigans/meteor-k-pattern
[5]: https://github.com/Korrigans/meteor-k-schema
[6]:https://github.com/MrLowkos
[7]:https://atmospherejs.com/mrlowkos
[8]:https://github.com/Aralun
[9]:https://atmospherejs.com/aralun
