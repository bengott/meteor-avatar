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
{{> avatar (user=<user> || userId=<userId>) (class='(large) (rounded || circle)')}}
```
Optional template parameters:
  1. Either a user object or userId (if neither -> default avatar).
  2. CSS class string, where you can optionally specify 'large' and 'rounded' or 'circle'. Or you can specify a custom class string to use instead.  
(e.g. `{{> avatar user=user class='<your custom css string>'}}`)

Global Configuration Options
----------------------------
The package exports a global `Avatar` object which has a property named `options` (also an object). If defined (e.g. from a startup config file in your app), these options override default functionality.

  - `emailHashProperty`: This property on the user object will be used for retrieving gravatars (useful when user emails are not published)
  - `defaultAvatarUrl`: This will replace the standard default avatar URL. It can be a relative path (e.g. 'images/defaultAvatar.png')
  - `gravatarDefault`: Gravatar default option to use (overrides default avatar URL). Options are available at: https://secure.gravatar.com/site/implement/images/#default-image

Example usage:
```
Avatar.options = {
  emailHashProperty: 'email_hash',
  defaultAvatarUrl: 'http://example.com/images/defaultAvatar.png'
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
  7. More to come...

Eventually, the plan is to add more UI to allow the user to select which one he/she wants or upload a new image.

Credits
-------
- [Sacha Greif](https://github.com/SachaG), for [suggesting the idea on crater.io](http://crater.io/posts/BfMsgzs5AzEdp6Byu)
- [Shai Alon](https://github.com/shaialon), for [contributing the Gravatar functionality to Telescope](https://github.com/TelescopeJS/Telescope/pull/436) that [I later modified](https://github.com/TelescopeJS/Telescope/pull/438)
- [Jérémie Parker](https://github.com/p-j), for providing the [gravatar package](https://github.com/p-j/meteor-gravatar)
