![logo](https://raw.githubusercontent.com/bengott/images/master/avatar-logo.png)
================================================================================

Consolidated Avatar Template Package for Meteor


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
{{> avatar (user=<user> || userId=<userId>) (class='(avatar-large || avatar-small) (avatar-rounded || avatar-circle)')
    (bgColor='<color>') (txtColor='<color>') }}
```
Optional template parameters:
  1. `user` or `userId`: Either a user object or userId string (if neither -> default avatar).
  2. `class`: CSS class string, where you can optionally specify 'large' or 'small' and 'rounded' or 'circle'. Or you can specify a custom class string to use instead.  
(e.g. `{{> avatar user=user class='<your custom css string>'}}`)
  3. `bgColor` and `txtColor`: Override the default colors for the initials avatar (color name or hex value). The default colors are white (`#FFF`) text on a gray (`#AAA`) background. You can override these colors globally in your own CSS, but these options allow for overriding the colors on this particular template instance.

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

Eventually, the plan is to add more UI to allow the user to select which one he/she wants or upload a new image.

Credits
-------
- [Sacha Greif](https://github.com/SachaG), for [suggesting the idea on crater.io](http://crater.io/posts/BfMsgzs5AzEdp6Byu)
- [Shai Alon](https://github.com/shaialon), for [contributing the Gravatar functionality to Telescope](https://github.com/TelescopeJS/Telescope/pull/436) that [I later modified](https://github.com/TelescopeJS/Telescope/pull/438)
- [Jérémie Parker](https://github.com/p-j), for providing the [gravatar package](https://github.com/p-j/meteor-gravatar)
- [Everyone who has contributed](https://github.com/bengott/meteor-avatar/graphs/contributors) to this project. :)
