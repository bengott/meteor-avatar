Package.describe({
  name: "bengott:avatar",
  summary: "Consolidated user avatar template (twitter, facebook, gravatar, etc.)",
  version: "0.2.1",
  git: "https://github.com/bengott/meteor-avatar"
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@0.9.3', 'METEOR@0.9.4']);
  api.use(['templating', 'underscore', 'stylus', 'jparker:gravatar@0.3.0'], ['client']);
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
