![logo](https://raw.githubusercontent.com/bengott/images/master/avatar-logo.png)
================================================================================

Consolidated Avatar Template Package for Meteor


***BREAKING CHANGES:***  
The template parameters have been overhauled in version 0.5.0. Please update your HTML accordingly if you update the package to the latest version.


Installation
------------
In your Meteor project directory, run:  
```
$ meteor add bengott:avatar
```
Of course, you also need to add the 'accounts-<service>' packages for the services you're using (e.g. accounts-twitter) and accounts-ui or something similar in order to add login functionality to your app.

Usage
-----
In an HTML file:
```
{{> avatar (user=<user> || userId=<userId>)
           (size='large' || 'small') (shape='rounded' || 'circle')
           (class='some custom classes')
           (bgColor='<color>') (txtColor='<color>') }}
```

Optional template parameters:
  1. `user` or `userId`: Either a user object or userId string, default avatar if omitted
  2. `size`: Size of the avatar, either 'large' (80px) or 'small' (30px), normal size (40px) if omitted
  3. `shape`: Used for CSS border-radius property, either 'rounded' or 'circle', square if omitted
  4. `class`: Any custom CSS classes you'd like to define on the avatar container
  5. `bgColor` and `txtColor`: Override the default colors for the initials avatar (color name or hex value). The default colors are white (`#FFF`) text on a gray (`#AAA`) background. You can override these colors globally in your own CSS, but these parameters allow for overriding the colors on this particular template instance.

Global Configuration Options
----------------------------
The package exports a global `Avatar` object which has a property named `options` (also an object). If defined (e.g. from a startup config file in your app), these options override default functionality.

  - `emailHashProperty`: This property on the user object will be used for retrieving gravatars (useful when user emails are not published)
  - `defaultAvatarUrl`: This will replace the standard default avatar URL. It can be a relative path (e.g. 'images/defaultAvatar.png')
  - `gravatarDefault`: Gravatar default option to use (overrides default avatar URL). Options are available at: https://secure.gravatar.com/site/implement/images/#default-image
  - `serverBaseUrl`: Server base URL. By default, the package tries to automatically determine your website's base URL. This option effectively overrides that. If calling Avatar.getUrl() from the server, this property is REQUIRED (because server can't call window.location to figure it out).

Example usage:
```
Avatar.options = {
  emailHashProperty: 'email_hash',
  defaultAvatarUrl: 'images/defaultAvatar.png',
  // gravatarDefault: 'identicon',
  serverBaseUrl: 'http://example.com'
};
```
NOTE: Gravatar's default option requires a publicly accessible URL, so it won't work when your app is running on localhost and you're using either the standard default URL or a custom `defaultAvatarUrl` that is a relative path.

How the package chooses an avatar
---------------------------------
Given a user object or userId, Avatar will retrieve the user's image with the following priority:
  1. Twitter
  2. Facebook
  3. Google
  4. GitHub
  5. Instagram
  6. Gravatar
  7. If no image can be retrieved, the user's initials will be shown.
  8. More to come...

**Linked Services/Accounts:**  
By default, the Meteor accounts system creates a separate user account for each service you login with. In order to merge those accounts together, you'd need to use a package like [accounts-meld](https://atmospherejs.com/splendido/accounts-meld) or [link-accounts](https://atmospherejs.com/bozhao/link-accounts). In the future, the plan is to add UI to allow the user to select which avatar they want to use ([Issue #10](https://github.com/bengott/meteor-avatar/issues/10)) and/or upload their own image ([Issue #9](https://github.com/bengott/meteor-avatar/issues/9)).

Credits
-------
- [Sacha Greif](https://github.com/SachaG), for [suggesting the idea on crater.io](http://crater.io/posts/BfMsgzs5AzEdp6Byu)
- [Shai Alon](https://github.com/shaialon), for [contributing the Gravatar functionality to Telescope](https://github.com/TelescopeJS/Telescope/pull/436) that [I later modified](https://github.com/TelescopeJS/Telescope/pull/438)
- [Jérémie Parker](https://github.com/p-j), for providing the [gravatar package](https://github.com/p-j/meteor-gravatar)
- [Everyone who has contributed](https://github.com/bengott/meteor-avatar/graphs/contributors) to this project. :)
