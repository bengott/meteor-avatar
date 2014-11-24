Package.describe({
  name: "bengott:avatar",
  summary: "Consolidated user avatar template (twitter, facebook, gravatar, etc.)",
  version: "0.6.0",
  git: "https://github.com/bengott/meteor-avatar"
});

Package.onUse(function(api) {
  api.versionsFrom(['METEOR@0.9.3', 'METEOR@0.9.4', 'METEOR@1.0']);
  api.use(['templating', 'stylus', 'reactive-var'], ['client']);
  api.use(['underscore', 'jparker:gravatar@0.3.0'], ['client', 'server']);
  api.addFiles(
    [
      'template/avatar.html',
      'template/avatar.js',
      'template/avatar.styl'
    ],
    ['client']
  );
  api.addFiles(
    [
      'export.js',
      'helpers.js',
      'default.png'
    ],
    ['client', 'server']
  );
  api.export('Avatar');
});
