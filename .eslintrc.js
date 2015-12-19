const ALERT = 2,
  COMPLEXITY = 10,
  IGNORE = 0,
  MAX_NESTED_BLOCKS = 4,
  MAX_NESTED_CALLBACKS = 10,
  MAX_PARAMS = 3,
  MAX_PATH_LENGTH = 3,
  MAX_STATEMENT_LENGTH = 80,
  MAX_STATEMENTS = 10,
  MIN_DEPTH = 3,
  TAB_SPACE = 2,
  WARN = 1;

module.exports = {
  parser: 'babel-eslint',
  env: {
    es6: true,
    browser: true,
    node: true,
    mongo: true,
    meteor: true,
    jquery: true,
    jasmine: true
  },
  plugins: [
    'html',
    'json',
    'react',
    'meteor',
    'mongodb',
    'lodash3',
    'jasmine'
  ],
  ecmaFeatures: {
    arrowFunctions: true,
    binaryLiterals: true,
    blockBindings: true,
    classes: true,
    defaultParams: true,
    destructuring: true,
    forOf: true,
    generators: true,
    modules: true,
    objectLiteralComputedProperties: true,
    objectLiteralDuplicateProperties: false,
    objectLiteralShorthandMethods: true,
    objectLiteralShorthandProperties: true,
    octalLiterals: true,
    regexUFlag: true,
    regexYFlag: true,
    restParams: true,
    spread: true,
    superInFunctions: true,
    templateStrings: true,
    unicodeCodePointEscapes: true,
    globalReturn: false,
    jsx: true,
    experimentalObjectRestSpread: true
  },
  rules: {

    /* Possible Errors */

    // disallow trailing commas in object literals
    'comma-dangle': [ALERT, 'never'],
    // disallow assignment in conditional expressions
    'no-cond-assign': [ALERT, 'always'],
    // disallow use of console
    'no-console': WARN,
    // disallow use of constant expressions in conditions
    'no-constant-condition': ALERT,
    // disallow control characters in regular expressions
    'no-control-regex': ALERT,
    // disallow use of debugger
    'no-debugger': WARN,
    // disallow duplicate arguments in functions
    'no-dupe-args': ALERT,
    // disallow duplicate keys when creating object literals
    'no-dupe-keys': ALERT,
    // disallow a duplicate case label.
    'no-duplicate-case': ALERT,
    // disallow the use of empty character classes in regular expressions
    'no-empty-character-class': ALERT,
    // disallow empty statements
    'no-empty': ALERT,
    // disallow assigning to the exception in a catch block
    'no-ex-assign': ALERT,
    // disallow double-negation boolean casts in a boolean context
    'no-extra-boolean-cast': ALERT,
    // disallow unnecessary parentheses
    'no-extra-parens': ALERT,
    // disallow unnecessary semicolons
    'no-extra-semi': ALERT,
    // disallow overwriting functions written as function declarations
    'no-func-assign': IGNORE,
    // disallow function or variable declarations in nested blocks
    'no-inner-declarations': ALERT,
    // disallow invalid regular expression strings in the RegExp constructor
    'no-invalid-regexp': ALERT,
    // disallow irregular whitespace outside of strings and comments
    'no-irregular-whitespace': ALERT,
    // disallow negation of the left operand of an in expression
    'no-negated-in-lhs': ALERT,
    // disallow the use of object properties of the global object (Math and JSON) as functions
    'no-obj-calls': ALERT,
    // disallow multiple spaces in a regular expression literal
    'no-regex-spaces': ALERT,
    // disallow sparse arrays
    'no-sparse-arrays': ALERT,
    // Avoid code that looks like two expressions but is actually one
    'no-unexpected-multiline': ALERT,
    // disallow unreachable statements after a return, throw, continue, or break statement
    'no-unreachable': ALERT,
    // disallow comparisons with the value NaN
    'use-isnan': ALERT,
    // ensure JSDoc comments are valid
    'valid-jsdoc': ALERT,
    // ensure that the results of typeof are compared against a valid string
    'valid-typeof': ALERT,

    /* Strict Mode */

    // babel/meteor inserts `use strict;` for us
    strict: [ALERT, 'never'],

    /* Best Practices */

    // Enforces getter/setter pairs in objects
    'accessor-pairs': ALERT,
    // treat var statements as if they were block scoped
    'block-scoped-var': ALERT,
    // specify the maximum cyclomatic complexity allowed in a program
    complexity: [WARN, COMPLEXITY],
    // require return statements to either always or never specify values
    'consistent-return': ALERT,
    // specify curly brace conventions for all control statements
    curly: ALERT,
    // require default case in switch statements
    'default-case': ALERT,
    // encourages use of dot notation whenever possible
    'dot-location': [ALERT, 'property'],
    // enforces consistent newlines before or after dots
    'dot-notation': [ALERT, { allowKeywords: true }],
    // require the use of === and !==
    eqeqeq: ALERT,
    // make sure for-in loops have an if statement
    'guard-for-in': ALERT,
    // disallow the use of alert, confirm, and prompt
    'no-alert': WARN,
    // disallow use of arguments.caller or arguments.callee
    'no-caller': ALERT,
    // disallow lexical declarations in case clauses
    'no-case-declarations': ALERT,
    // disallow division operators explicitly at beginning of regular expression
    'no-div-regex': ALERT,
    // disallow else after a return in an if
    'no-else-return': ALERT,
    // disallow use of labels for anything other then loops and switches
    'no-empty-label': ALERT,
    // disallow use of empty destructuring patterns
    'no-empty-pattern': ALERT,
    // disallow comparisons to null without a type-checking operator
    'no-eq-null': ALERT,
    // disallow use of eval()
    'no-eval': ALERT,
    // disallow adding to native types
    'no-extend-native': ALERT,
    // disallow unnecessary function binding
    'no-extra-bind': ALERT,
    // disallow fallthrough of case statements
    'no-fallthrough': ALERT,
    // disallow the use of leading or trailing decimal points in numeric literals
    'no-floating-decimal': ALERT,
    // disallow the type conversions with shorter notations
    'no-implicit-coercion': ALERT,
    // disallow use of eval()-like methods
    'no-implied-eval': ALERT,
    // disallow this keywords outside of classes or class-like objects
    'no-invalid-this': ALERT,
    // disallow usage of __iterator__ property
    'no-iterator': ALERT,
    // disallow use of labeled statements
    'no-labels': ALERT,
    // disallow unnecessary nested blocks
    'no-lone-blocks': ALERT,
    // disallow creation of functions within loops
    'no-loop-func': ALERT,
    // disallow the use of magic numbers
    'no-magic-numbers': ALERT,
    // disallow use of multiple spaces
    'no-multi-spaces': ALERT,
    // disallow use of multiline strings
    'no-multi-str': ALERT,
    // disallow reassignments of native objects
    'no-native-reassign': ALERT,
    // disallow use of new operator for Function object
    'no-new-func': ALERT,
    // disallows creating new instances of String,Number, and Boolean
    'no-new-wrappers': ALERT,
    // disallow use of the new operator when not part of an assignment or comparison
    'no-new': ALERT,
    // disallow use of octal escape sequences in string literals, such as var foo = "Copyright \251";
    'no-octal-escape': ALERT,
    // disallow use of octal literals
    'no-octal': ALERT,
    // disallow reassignment of function parameters
    'no-param-reassign': [ALERT, { props: false }],
    // disallow use of process.env
    'no-process-env': WARN,
    // disallow usage of __proto__ property
    'no-proto': ALERT,
    // disallow declaring the same variable more than once
    'no-redeclare': [ALERT, { builtinGlobals: true }],
    // disallow use of assignment in return statement
    'no-return-assign': ALERT,
    // disallow use of javascript: urls.
    'no-script-url': ALERT,
    // disallow comparisons where both sides are exactly the same
    'no-self-compare': ALERT,
    // disallow use of the comma operator
    'no-sequences': ALERT,
    // restrict what can be thrown as an exception
    'no-throw-literal': ALERT,
    // disallow usage of expressions in statement position
    'no-unused-expressions': ALERT,
    // disallow unnecessary .call() and .apply()
    'no-useless-call': ALERT,
    // disallow unnecessary concatenation of literals or template literals
    'no-useless-concat': ALERT,
    // disallow use of the void operator
    'no-void': ALERT,
    // disallow usage of configurable warning terms in comments - e.g. todo or fixme
    'no-warning-comments': [WARN, {
      terms: ['todo', 'fixme', 'xxx'],
      location: 'start'
    }],
    // disallow use of the with statement
    'no-with': ALERT,
    // require use of the second argument for parseInt()
    radix: ALERT,
    // require declaration of all vars at the top of their containing scope
    'vars-on-top': ALERT,
    // require immediate function invocation to be wrapped in parentheses
    'wrap-iife': [ALERT, 'any'],
    // require or disallow Yoda conditions
    yoda: ALERT,

    /* Variables */

    // enforce or disallow variable initializations at definition
    'init-declarations': [WARN, 'always'],
    // disallow the catch clause parameter name being the same as a variable in the outer scope
    'no-catch-shadow': ALERT,
    // disallow deletion of variables
    'no-delete-var': ALERT,
    // disallow labels that share a name with a variable
    'no-label-var': ALERT,
    // disallow shadowing of names such as arguments
    'no-shadow-restricted-names': ALERT,
    // disallow declaration of variables already declared in the outer scope
    'no-shadow': ALERT,
    // disallow use of undefined when initializing variables
    'no-undef-init': ALERT,
    //  disallow use of undeclared variables unless mentioned in a /*global */ block
    'no-undef': ALERT,
    // disallow use of undefined variable
    'no-undefined': IGNORE,
    // disallow declaration of variables that are not used in the code
    'no-unused-vars': ALERT,
    // disallow use of variables before they are defined
    'no-use-before-define': ALERT,

    /* Node.js and CommonJS */

    // enforce return after a callback
    'callback-return': ALERT,
    // enforce require() on top-level module scope
    'global-require': ALERT,
    // enforce error handling in callbacks
    'handle-callback-err': ALERT,
    // disallow mixing regular variable and require declarations
    'no-mixed-requires': ALERT,
    // disallow use of new operator with the require function
    'no-new-require': ALERT,
    // disallow string concatenation with __dirname and __filename
    'no-path-concat': ALERT,
    // disallow process.exit()
    'no-process-exit': ALERT,
    // restrict usage of specified node modules
    'no-restricted-modules': IGNORE,
    // disallow use of synchronous methods
    'no-sync': ALERT,

    /* Stylistic Issues */

    // enforce spacing inside array brackets
    'array-bracket-spacing': [ALERT, 'never'],
    // disallow or enforce spaces inside of single line blocks
    'block-spacing': [ALERT, 'always'],
    // enforce one true brace style
    'brace-style': [ALERT, 'stroustrup', { allowSingleLine: true }],
    // require camel case names
    camelcase: [ALERT, { properties: 'always' }],
    // enforce spacing before and after comma
    'comma-spacing': [ALERT, { before: false, after: true }],
    // enforce one true comma style
    'comma-style': [ALERT, 'last'],
    // require or disallow padding inside computed properties
    'computed-property-spacing': [ALERT, 'never'],
    //  enforce consistent naming when capturing the current execution context
    'consistent-this': [ALERT, 'self'],
    // enforce newline at the end of file, with no multiple empty lines
    'eol-last': ALERT,
    // require function expressions to have a name
    'func-names': WARN,
    // enforce use of function declarations or expressions
    'func-style': IGNORE,
    // this option enforces minimum and maximum identifier lengths (variable names, property names etc.)
    'id-length': IGNORE,
    // require identifiers to match the provided regular expression
    'id-match': IGNORE,
    // specify tab or space width for your code
    indent: [ALERT, 2],
    // specify whether double or single quotes should be used in JSX attributes
    'jsx-quotes': [ALERT, 'prefer-single'],
    // enforce spacing between keys and values in object literal properties
    'key-spacing': [ALERT, { beforeColon: false, afterColon: true }],
    // disallow mixed LF and CRLF as linebreaks
    'linebreak-style': [ALERT, 'unix'],
    // enforce empty lines around comments
    'lines-around-comment': [ALERT, {
      beforeBlockComment: true,
      allowBlockStart: true,
      allowObjectStart: true,
      allowArrayStart: true
    }],
    // specify the maximum depth that blocks can be nested
    'max-depth': [WARN, MAX_NESTED_BLOCKS],
    // specify the maximum length of a line in your program
    'max-len': [WARN, MAX_STATEMENT_LENGTH, TAB_SPACE, {
      ignoreComments: true,
      ignoreUrls: true
    }],
    // specify the maximum depth callbacks can be nested
    'max-nested-callbacks': [WARN, MAX_NESTED_CALLBACKS],
    // limits the number of parameters that can be used in the function declaration.
    'max-params': [WARN, MAX_PARAMS],
    // specify the maximum number of statement allowed in a function
    'max-statements': [IGNORE, MAX_STATEMENTS],
    // require a capital letter for constructors
    'new-cap': [ALERT, { newIsCap: true, capIsNew: false }],
    // disallow the omission of parentheses when invoking a constructor with no arguments
    'new-parens': ALERT,
    // require or disallow an empty newline after variable declarations
    'newline-after-var': ALERT,
    // disallow use of the Array constructor
    'no-array-constructor': ALERT,
    // disallow use of bitwise operators
    'no-bitwise': ALERT,
    // disallow use of the continue statement
    'no-continue': ALERT,
    // disallow comments inline after code
    'no-inline-comments': ALERT,
    // disallow if as the only statement in an else block
    'no-lonely-if': ALERT,
    // disallow mixed spaces and tabs for indentation
    'no-mixed-spaces-and-tabs': [ALERT, 'smart-tabs'],
    // disallow multiple empty lines
    'no-multiple-empty-lines': [ALERT, { max: 2, maxEOF: 1 }],
    // disallow negated conditions
    'no-negated-condition': ALERT,
    // disallow nested ternary expressions
    'no-nested-ternary': ALERT,
    // disallow the use of the Object constructor
    'no-new-object': ALERT,
    // disallow use of unary operators, ++ and --
    'no-plusplus': [ALERT, { allowForLoopAfterthoughts: true }],
    // disallow use of certain syntax in code
    'no-restricted-syntax': [ALERT, 'ClassDeclaration'],
    // disallow space between function identifier and application
    'no-spaced-func': ALERT,
    // disallow the use of ternary operators
    'no-ternary': IGNORE,
    // disallow trailing whitespace at the end of lines
    'no-trailing-spaces': ALERT,
    // disallow dangling underscores in identifiers
    'no-underscore-dangle': IGNORE,
    // disallow the use of ternary operators when a simpler alternative exists
    'no-unneeded-ternary': ALERT,
    // require or disallow padding inside curly braces
    'object-curly-spacing': [ALERT, 'always'],
    // require or disallow one variable declaration per function
    'one-var': [WARN, 'always'],
    // require assignment operator shorthand where possible or prohibit it entirely
    'operator-assignment': [ALERT, 'always'],
    // enforce operators to be placed before or after line breaks
    'operator-linebreak': [ALERT, 'before'],
    // enforce padding within blocks
    'padded-blocks': [ALERT, 'never'],
    // require quotes around object literal property names
    'quote-props': [ALERT, 'as-needed', { keywords: true }],
    // specify whether backticks, double or single quotes should be used
    quotes: [ALERT, 'single', 'avoid-escape'],
    // Require JSDoc comment
    'require-jsdoc': [WARN, {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true
      }
    }],
    // enforce spacing before and after semicolons
    'semi-spacing': [ALERT, { before: false, after: true }],
    // require or disallow use of semicolons instead of ASI
    semi: [ALERT, 'always'],
    // sort variables within the same declaration block
    'sort-vars': [IGNORE, { ignoreCase: true }],
    // require a space after certain keywords
    'space-after-keywords': [ALERT, 'always'],
    // require or disallow a space before blocks
    'space-before-blocks': [ALERT, 'always'],
    // require or disallow a space before function opening parenthesis
    'space-before-function-paren': [ALERT, 'never'],
    // require a space before certain keywords
    'space-before-keywords': [ALERT, 'always'],
    // require or disallow spaces inside parentheses
    'space-in-parens': [ALERT, 'never'],
    // require spaces around operators
    'space-infix-ops': ALERT,
    // require a space after return, throw, and case
    'space-return-throw-case': ALERT,
    // require or disallow spaces before/after unary operators
    'space-unary-ops': [ALERT, { words: true, nonwords: false }],
    // require or disallow a space immediately following the // or /* in a comment
    'spaced-comment': [ALERT, 'always'],
    // require regex literals to be wrapped in parentheses
    'wrap-regex': IGNORE,

    /* ECMAScript 6 */

    // require braces in arrow function body
    'arrow-body-style': [ALERT, 'as-needed'],
    // require parens in arrow function arguments
    'arrow-parens': [ALERT, 'as-needed'],
    // require space before/after arrow functions arrow
    'arrow-spacing': [ALERT, { before: true, after: true }],
    // verify calls of super() in constructors
    'constructor-super': ALERT,
    // enforce spacing around the * in generator functions
    'generator-star-spacing': [ALERT, { before: false, after: true }],
    // disallow arrow functions where a condition is expected
    'no-arrow-condition': ALERT,
    //  disallow modifying variables of class declarations
    'no-class-assign': ALERT,
    // disallow modifying variables that are declared using const
    'no-const-assign': ALERT,
    // disallow duplicate name in class members
    'no-dupe-class-members': ALERT,
    // disallow use of this/super before calling super() in constructors.
    'no-this-before-super': ALERT,
    // require let or const instead of var
    'no-var': ALERT,
    // require method and property shorthand syntax for object literals
    'object-shorthand': ALERT,
    // suggest using arrow functions as callbacks
    'prefer-arrow-callback': IGNORE,
    // suggest using const declaration for variables that are never modified after declared
    'prefer-const': WARN,
    // suggest using Reflect methods where applicable
    'prefer-reflect': WARN,
    // suggest using the spread operator instead of .apply().
    'prefer-spread': ALERT,
    // suggest using template literals instead of strings concatenation
    'prefer-template': ALERT,
    // disallow generator functions that do not have yield
    'require-yield': ALERT,

    /* Plugins */

    /* - Meteor */

    // Definitions for global Meteor variables based on environment
    'meteor/globals': ALERT,
    // Meteor Core API
    'meteor/core': ALERT,
    // Prevent misusage of Publish and Subscribe
    'meteor/pubsub': ALERT,
    // Prevent misusage of methods
    'meteor/methods': ALERT,
    // Core API for check and Match
    'meteor/check': ALERT,
    // Core API for connections
    'meteor/connections': ALERT,
    // Core API for collections
    'meteor/collections': ALERT,
    // Core API for Session
    'meteor/session': ALERT,
    // Enforce check on all arguments passed to methods and publish functions
    'meteor/audit-argument-checks': IGNORE,
    // Prevent usage of Session
    'meteor/no-session': ALERT,
    // Prevent deprecated template lifecycle callback assignments
    'meteor/no-blaze-lifecycle-assignment': ALERT,
    // Prevent usage of Meteor.setTimeout with zero delay
    'meteor/no-zero-timeout': ALERT,
    // Force consistent event handler parameters in event maps
    'meteor/blaze-consistent-eventmap-params': ALERT,

    /* - React */

    // Prevent missing displayName in a React component definition
    'react/display-name': WARN,
    // Forbid certain propTypes
    'react/forbid-prop-types': WARN,
    // Enforce boolean attributes notation in JSX
    'react/jsx-boolean-value': WARN,
    // Validate closing bracket location in JSX
    'react/jsx-closing-bracket-location': WARN,
    // Enforce or disallow spaces inside of curly braces in JSX attributes
    'react/jsx-curly-spacing': WARN,
    // Enforce event handler naming conventions in JSX
    'react/jsx-handler-names': WARN,
    // Validate props indentation in JSX
    'react/jsx-indent-props': WARN,
    // Validate JSX has key prop when in array or iterator
    'react/jsx-key': WARN,
    // Limit maximum of props on a single line in JSX
    'react/jsx-max-props-per-line': WARN,
    // Prevent usage of .bind() and arrow functions in JSX props
    'react/jsx-no-bind': WARN,
    // Prevent duplicate props in JSX
    'react/jsx-no-duplicate-props': WARN,
    // Prevent usage of unwrapped JSX strings
    'react/jsx-no-literals': WARN,
    // Disallow undeclared variables in JSX
    'react/jsx-no-undef': WARN,
    // Enforce PascalCase for user-defined JSX components
    'react/jsx-pascal-case': WARN,
    // Enforce quote style for JSX attributes
    // 'react/jsx-quotes': WARN, // DEPRECIED
    // Enforce propTypes declarations alphabetical sorting
    'react/jsx-sort-prop-types': WARN,
    // Enforce props alphabetical sorting
    'react/jsx-sort-props': WARN,
    // Prevent React to be incorrectly marked as unused
    'react/jsx-uses-react': WARN,
    // Prevent variables used in JSX to be incorrectly marked as unused
    'react/jsx-uses-vars': WARN,
    // Prevent usage of dangerous JSX properties
    'react/no-danger': WARN,
    // Prevent usage of setState in componentDidMount
    'react/no-did-mount-set-state': WARN,
    // Prevent usage of setState in componentDidUpdate
    'react/no-did-update-set-state': WARN,
    // Prevent direct mutation of this.state
    'react/no-direct-mutation-state': WARN,
    // Prevent multiple component definition per file
    'react/no-multi-comp': WARN,
    // Prevent usage of setState
    'react/no-set-state': WARN,
    // Prevent usage of unknown DOM property
    'react/no-unknown-property': WARN,
    // Prefer es6 class instead of createClass for React Components
    'react/prefer-es6-class': WARN,
    // Prevent missing props validation in a React component definition
    'react/prop-types': WARN,
    // Prevent missing React when using JSX
    'react/react-in-jsx-scope': WARN,
    // Restrict file extensions that may be required
    'react/require-extension': WARN,
    // Prevent extra closing tags for components without children
    'react/self-closing-comp': WARN,
    // Enforce component methods order
    'react/sort-comp': WARN,
    // Prevent missing parentheses around multilines JSX
    'react/wrap-multilines': WARN,

    /* - Jasmine */

    // Disallow use of focused tests
    'jasmine/no-focused-tests': ALERT,
    // Disallow use of disabled tests
    'jasmine/no-disabled-tests': WARN,
    // Disallow the use of duplicate spec names
    'jasmine/no-spec-dupes': [WARN, 'branch'],
    // Disallow the use of duplicate suite names
    'jasmine/no-suite-dupes': [WARN, 'branch'],
    // Enforce that a suitess callback does not contain any arguments
    'jasmine/no-suite-callback-args': ALERT,
    // Enforce expectation
    'jasmine/missing-expect': [WARN, 'expect()'],
    // Enforce valid expect() usage
    'jasmine/valid-expect': WARN,

    /* - Lodash */

    // Prefer property shorthand syntax
    'lodash3/prop-shorthand': WARN,
    // Prefer matches property shorthand syntax
    'lodash3/matches-shorthand': [WARN, MAX_PATH_LENGTH],
    // Prefer matches shorthand syntax
    'lodash3/matches-prop-shorthand': WARN,
    // Preferred aliases
    'lodash3/prefer-chain': WARN,
    // Prefer chain over nested lodash calls
    'lodash3/preferred-alias': WARN,
    // Prevent chaining syntax for single method, e.g. _(x).map().value()
    'lodash3/no-single-chain': WARN,
    // Prefer _.reject over filter with !(expression) or x.prop1 !== value
    'lodash3/prefer-reject': [WARN, MAX_PATH_LENGTH],
    // Prefer _.filter over _.forEach with an if statement inside.
    'lodash3/prefer-filter': [WARN, MAX_PATH_LENGTH],
    // Prefer passing thisArg over binding.
    'lodash3/no-unnecessary-bind': WARN,
    // Prevent chaining without evaluation via value() or non-chainable methods like max().
    'lodash3/unwrap': WARN,
    // Prefer _.compact over _.filter for only truthy values.
    'lodash3/prefer-compact': WARN,
    // Do not use .value() on chains that have already ended (e.g. with max() or reduce())
    'lodash3/no-double-unwrap': WARN,
    // Prefer _.map over _.forEach with a push inside.
    'lodash3/prefer-map': WARN,
    // Prefer using array and string methods in the chain and not the initial value, e.g. _(str).split( )...
    'lodash3/prefer-wrapper-method': WARN,
    // Prefer using _.invoke over _.map with a method call inside.
    'lodash3/prefer-invoke': WARN,
    // Prefer using _.prototype.thru in the chain and not call functions in the initial value, e.g. _(x).thru(f).map(g)...
    'lodash3/prefer-thru': WARN,
    // Prefer using Lodash chains (e.g. _.map) over native and mixed chains.
    'lodash3/prefer-lodash-chain': WARN,
    // Prefer using Lodash collection methods (e.g. _.map) over native array methods.
    'lodash3/prefer-lodash-method': WARN,
    // Prefer using _.is* methods over typeof and instanceof checks when applicable.
    'lodash3/prefer-lodash-typecheck': WARN,
    // Do not use .commit() on chains that should end with .value()
    'lodash3/no-commit': WARN,
    // Prefer using _.get or _.has over expression chains like a && a.b && a.b.c.
    'lodash3/prefer-get': [WARN, MIN_DEPTH],
    // Always return a value in iteratees of lodash collection methods that arent forEach.
    'lodash3/collection-return': WARN,
    // Prefer _.matches over conditions like a.foo === 1 && a.bar === 2 && a.baz === 3.
    'lodash3/prefer-matches': WARN,
    // Prefer _.times over _.map without using the iteratees arguments.
    'lodash3/prefer-times': WARN,

    /* - MongoDB */

    // Check insertOne/insertMany calls to ensure their arguments are well formed.
    'mongodb/check-insert-calls': ALERT,
    // Check find/findOne calls to ensure their arguments are well formed
    'mongodb/check-query-calls': ALERT,
    // Check update calls to ensure their arguments are well formed.
    'mongodb/check-update-calls': ALERT,
    // Check remove calls to ensure their arguments are well formed.
    'mongodb/check-remove-calls': ALERT,
    // Check collection calls and warn in case of deprecated methods usage.
    'mongodb/check-deprecated-calls': ALERT,
    // Check update queries to ensure no raw replace is done
    'mongodb/no-replace': WARN,
    // Check $rename update operator usage.
    'mongodb/check-rename-updates': ALERT,
    // Check $unset update operator usage.
    'mongodb/check-unset-updates': ALERT,
    // Check $currentDate update operator usage.
    'mongodb/check-current-date-updates': ALERT,
    // Check update queries to ensure numeric operators like $mul and $inc contain numeric values.
    'mongodb/check-numeric-updates': ALERT,
    // Check $min and $max update operators usage.
    'mongodb/check-minmax-updates': ALERT,
    // Check $set and $setOnInsert update operators usage.
    'mongodb/check-set-updates': ALERT,
    // Check $push update operator usage and its modifiers.
    'mongodb/check-push-updates': ALERT,
    // Check $pull update operator usage.
    'mongodb/check-pull-updates': ALERT,
    // Check $pop update operator usage.
    'mongodb/check-pop-updates': ALERT,
    // Check $addToSet update operator usage and common misuses.
    'mongodb/check-addtoset-updates': ALERT,
    // Check deprecated update operator usage.
    'mongodb/check-deprecated-updates': ALERT
  },
  settings: {
    mongodb: {
      callPatterns: {
        query: [
          '(\\.|^)db\\.collection\\([^\\)]+\\)\\.(find|findOne|)$'
        ],
        update: [
          '(\\.|^)db\\.collection\\([^\\)]+\\)\\.(findOneAndUpdate'
          + '|updateOne|updateMany)$'
        ],
        insert: [
          '(\\.|^)db\\.collection\\([^\\)]+\\)\\.(insertOne|insertMany)$'
        ],
        remove: [
          '(\\.|^)db\\.collection\\([^\\)]+\\)\\.(findOneAndDelete'
          + '|deleteOne|deleteMany)$'
        ],
        deprecated: [
          '(\\.|^)db\\.collection\\([^\\)]+\\)\\.(remove|update|'
          + 'findAndModify|ensureIndex|findAndRemove|insert|dropAllIndexes)$'
        ]
      }
    },
    meteor: {
      // all universal collections
      collections: []
    }
  },
  globals: {
    // main package
    K: true,
    checkLegacyWhere: true,
    checkForPrimitive: true,
    checkLegacyMatchInteger: true,
    checkLegacyArray: true,
    checkLegacyObject: true,
    checkLegacyMatchOneOf: true,
    checkCustomFunction: true,
    checkForExactValues: true,
    errorPrefix: true,
    buildCheckError: true,
    primitiveMap: true,

    // tests
    beautifyPattern: true,
    beautifyValue: true,
    matches: true,
    fails: true,
    primitiveValues: true,
    integrateArray: true,
    integrateCustomFunctions: true,
    integrateExactValue: true,
    integrateMatchAny: true,
    integrateMatchInteger: true,
    integrateMatchOneOf: true,
    integrateMatchWhere: true,
    integrateObject: true,
    integratePrimitiveTypes: true,
    matchAny: true,
    matchInteger: true
  }
};
