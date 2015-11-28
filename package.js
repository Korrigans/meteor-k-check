Package.describe({
  name: 'korrigans:k-check',
  version: '0.1.0',
  summary: '', // TODO
  git: 'https://github.com/Korrigans/meteor-k-check.git',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.2.1');

  api.use([
    'korrigans:k@0.1.0',
    'ecmascript'
  ]);

  api.imply('korrigans:k');

  api.addFiles('check.js');
});

Package.onTest(function(api) {
  api.use([
    'ecmascript',
    'sanjo:jasmine@0.20.2',
    'korrigans:k-check',
    'stevezhu:lodash@3.10.1',

    'check' //Compatibility tests
  ]);

  //Console tests convenience
  api.imply([
    'korrigans:k',
    'stevezhu:lodash@3.10.1',
    'check'
  ]);

  api.addFiles('check-tests.js');
});
