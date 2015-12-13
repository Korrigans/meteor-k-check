Package.describe({
  name: 'korrigans:k-check',
  version: '0.1.0',
  summary: 'Extensible, informative check package compatible with native check patterns and more',
  git: 'https://github.com/Korrigans/meteor-k-check.git',
  documentation: 'README.md'
});

/*
  eslint no-var: 0
 */
Package.onUse(function onUse(api) {
  var patternsFiles,
    checkFile,
    symbolFile,
    internalsFiles;

  api.versionsFrom('1.2.1');

  api.use([
    'ecmascript',
    'korrigans:k@0.1.0',
    'stevezhu:lodash@3.10.1'
  ]);

  api.use('korrigans:k-debug@0.1.0', { weak: true });

  api.imply('korrigans:k');

  patternsFiles = [
    'patterns/array.js',
    'patterns/custom-functions.js',
    'patterns/equal-value.js',
    'patterns/match-integer.js',
    'patterns/match-one-of.js',
    'patterns/match-where.js',
    'patterns/object.js',
    'patterns/primitive-types.js'
  ];
  checkFile = 'check.js';
  symbolFile = 'check-symbol.js';
  internalsFiles = [
    'internals/namespace.js',
    'internals/primitive-map.js',
    'internals/beautifiers.js',
    'internals/error-builder.js'
  ];

  // As all these files only feature declarations and no actual
  // method calls, the order is not important.
  api.addFiles(internalsFiles);
  api.addFiles(checkFile);
  api.addFiles(patternsFiles);
  api.addFiles(symbolFile);
});

Package.onTest(function onTest(api) {
  var
    constantsFile = [],
    mainFile = [],
    patternFiles = [],
    internalsFiles = [],

    integrationFiles = [];

  api.use([
    'ecmascript',
    'sanjo:jasmine@0.20.2',
    'korrigans:k-debug@0.1.0',
    'korrigans:k-check',
    'stevezhu:lodash@3.10.1',

    // Compatibility tests
    'check'
  ]);

  // Console tests convenience
  api.imply([
    'korrigans:k@0.1.0',
    'stevezhu:lodash@3.10.1',
    'check'
  ]);

  constantsFile.push(
    'tests/constants.js'
  );

  internalsFiles.push(
    'tests/units/internals/namespace.js',
    'tests/units/internals/primitive-map.js',
    'tests/units/internals/beautifiers.js',
    'tests/units/internals/error-builder.js'
  );

  patternFiles.push(
    'tests/units/patterns/array.js',
    'tests/units/patterns/custom-functions.js',
    'tests/units/patterns/match-any.js',
    'tests/units/patterns/match-integer.js',
    'tests/units/patterns/match-one-of.js',
    'tests/units/patterns/match-where.js',
    'tests/units/patterns/object.js',
    'tests/units/patterns/primitive-types.js'
  );

  mainFile.push(
    'tests/units/k-check.js'
  );

  integrationFiles.push(
    'tests/integrations/k-check/array.js',
    'tests/integrations/k-check/custom-functions.js',
    'tests/integrations/k-check/match-any.js',
    'tests/integrations/k-check/match-integer.js',
    'tests/integrations/k-check/match-one-of.js',
    'tests/integrations/k-check/match-where.js',
    'tests/integrations/k-check/object.js',
    'tests/integrations/k-check/primitive-types.js',
    'tests/integrations/k-check.js',
    'tests/integrations/path.js'
  );

  api.addFiles(constantsFile);
  api.addFiles(internalsFiles);
  api.addFiles(patternFiles);
  api.addFiles(mainFile);

  api.addFiles(integrationFiles);
});
