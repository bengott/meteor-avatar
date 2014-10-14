Package.describe({
  name: "bengott:avatar",
  summary: "Consolidated user avatar template (twitter, facebook, gravatar, etc.)",
  version: "0.1.3",
  git: "https://github.com/bengott/meteor-avatar"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.4');
  api.use(['templating', 'underscore', 'stylus', 'jparker:crypto-md5@0.1.1'], ['client']);
  api.addFiles(
    [
      'export.js',
      'helpers.js',
      'default.png',
      'template/avatar.html',
      'template/avatar.js',
      'template/avatar.styl'
    ],
    ['client']
  );
  api.export('Avatar');
});
