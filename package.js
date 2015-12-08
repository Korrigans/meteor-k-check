Package.describe({
  name: 'korrigans:k-check',
  version: '0.1.0',
  // TODO
  summary: '',
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
    'ecmascript'
  ]);

  api.imply('korrigans:k');

  legacyFiles = [
    'legacy-patterns/array.js',
    'legacy-patterns/match-integer.js',
    'legacy-patterns/match-one-of.js',
    'legacy-patterns/match-where.js',
    'legacy-patterns/object.js',
    'legacy-patterns/primitive-types.js'
  ];
  checkFile = 'check.js';
  symbolFile = 'check-symbol.js';
  internalsFiles = [
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

  api.addFiles('check-tests.js');
});
