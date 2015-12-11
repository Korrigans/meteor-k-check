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
  var legacyFiles,
    checkFile,
    symbolFile,
    internalsFiles;

  api.versionsFrom('1.2.1');

  api.use([
    'korrigans:k@0.1.0',
    'stevezhu:lodash@3.10.1',
    'ecmascript'
  ]);

  api.imply('korrigans:k');

  legacyFiles = [
    'legacy-patterns/array.js',
    'legacy-patterns/custom-functions.js',
    'legacy-patterns/match-integer.js',
    'legacy-patterns/match-one-of.js',
    'legacy-patterns/match-where.js',
    'legacy-patterns/object.js',
    'legacy-patterns/primitive-types.js'
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
  api.addFiles(legacyFiles);
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
    'korrigans:k-check',
    'stevezhu:lodash@3.10.1',

    // Compatibility tests
    'check'
  ]);

  // Console tests convenience
  api.imply([
    'korrigans:k',
    'stevezhu:lodash@3.10.1',
    'check'
  ]);

  constantsFile.push(
    'tests/units/constants.js'
  );

  internalsFiles.push(
    'tests/units/internals/namespace.js',
    'tests/units/internals/primitive-map.js',
    'tests/units/internals/beautifiers.js',
    'tests/units/internals/error-builder.js'
  );

  patternFiles.push(
    'tests/units/subs/array.js',
    'tests/units/subs/custom-functions.js',
    'tests/units/subs/match-any.js',
    'tests/units/subs/match-integer.js',
    'tests/units/subs/match-one-of.js',
    'tests/units/subs/match-where.js',
    'tests/units/subs/object.js',
    'tests/units/subs/primitive-types.js'
  );

  mainFile.push(
    'tests/units/main.js'
  );

  integrationFiles.push(
    'tests/integrations/path.js'
  );

  api.addFiles(constantsFile);
  api.addFiles(internalsFiles);
  api.addFiles(patternFiles);
  api.addFiles(mainFile);

  api.addFiles(integrationFiles);
});
