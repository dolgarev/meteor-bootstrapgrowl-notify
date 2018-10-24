Package.describe({
  name: 'liberation:bootstrapgrowl-notify',
  version: '0.0.1',
  // Brief, one-line summary of the package.
  summary: '',
  // URL to the Git repository containing the source code for this package.
  git: 'https://github.com/dolgarev/meteor-bootstrapgrowl-notify.git',
  // By default, Meteor will default to using README.md for documentation.
  // To avoid submitting documentation, set this field to null.
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('1.6');
  api.use(['check', 'jquery', 'ecmascript'], 'client');
  api.mainModule('bootstrapgrowl-notify.js', 'client');
});

Package.onTest(function(api) {
  api.use(['ecmascript', 'tinytest'], 'client');
  api.use('bootstrapgrowl-notify', 'client');
  api.mainModule('bootstrapgrowl-notify-tests.js', 'client');
});
