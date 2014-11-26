![logo](https://raw.githubusercontent.com/bengott/images/master/avatar-logo.png)
================================================================================

Consolidated Avatar Template Package for Meteor
-----------------------------------------------

***BREAKING CHANGES:***
The template parameters have been overhauled in version 0.5.0. The `Avatar.options` object is changing quite a bit in version 0.6.0 too. Basically, things are still in a state of flux (pre-1.0.0), so check for breaking changes when you update the package.


Installation
------------
In your Meteor project directory, run:
```
$ meteor add bengott:avatar
```
Of course, you also need to add the accounts-<service> packages for the services you're using (e.g. accounts-twitter) and accounts-ui or something similar in order to add login functionality to your app.

Usage
-----
In an HTML file:
```
{{> avatar (user=<user> || userId=<userId>)
           (size="large" || "small") (shape="rounded" || "circle")
           (class="some custom classes")
           (initials="<initials>") (bgColor="<color>") (txtColor="<color>") }}
```

That may look like a lot of options, but they are all optional. Most of the time, your HTML will look more like this:
```
{{> avatar user=this shape="circle"}}
```

Optional template parameters:
  - `user` or `userId`: Either a user object or userId string, default avatar if omitted
  - `size`: Size of the avatar, either "large" (80px) or "small" (30px), normal size (40px) if omitted
  - `shape`: Used for CSS border-radius property, either "rounded" or "circle", square if omitted
  - `class`: Any custom CSS classes you'd like to define on the avatar container. The string is passed straight through to the `class` attribute on the `div` container element.
  - `initials`: Specify the initials to show for the initials avatar. The package automatically tries to determine the user's initials from profile data, but if defined, this param will override that.
  - `bgColor` and `txtColor`: Override the default colors for the initials avatar (color name or hex value string). The default colors are white (`"#FFF"`) text on a gray (`"#AAA"`) background. You could also override these default colors in your CSS if you wanted to, but this param allows you to do it directly from the template call.

Global Configuration Options
----------------------------
The package exports a global `Avatar` object which has a property named `options` (also an object). If defined (e.g. from a config file in your app), these options override default functionality.

  - `emailHashProperty`: This property on the user object will be used for retrieving gravatars (useful when user emails are not published)
  - `defaultType`: What to show when no avatar can be found via linked services: "initials" (default) or "image"
  - `defaultImageUrl`: This will replace the included package default image URL ("packages/bengott_avatar/default.png"). It can be a relative path (e.g. "images/defaultAvatar.png").
  - `gravatarDefault`: Gravatar default option to use (overrides defaultImageUrl option and included package default image URL). Options are available at: https://secure.gravatar.com/site/implement/images/#default-image

Example usage:
- To show initials when no avatar can be found via linked services, you don't need to define any options. This is the default functionality.

- To show the included package default image:
```
Avatar.options = {
  defaultType: "image"
};
```
- To show a custom default image:
```
Avatar.options = {
  defaultType: "image",
  defaultImageUrl: "img/default-avatar.png" OR "http://example.com/default-avatar.png"
};
```
  ***Note that Gravatar's default option requires a publicly accessible URL, so it won't work when your app is running on localhost and you're using either the included package default image or a custom defaultImageUrl that is a relative path. It will work fine once deployed though.*** 

- To show one of Gravatar's options (e.g. "identicon"):
```
Avatar.options = {
  defaultType: "image",
  gravatarDefault: "identicon"
};
```
  ***Note that gravatarDefault overrides defaultImageUrl and the included package default image.***

- And if your app does not publish the user.emails object/property but publishes an email hash property instead, you can specify it like this (the Gravatar package generates a hash internally when you give it an email too; this just allows you to decouple those two steps so as not to make all your users' emails public):
```
Avatar.options = {
  emailHashProperty: "email_hash"
};
```

How the package chooses an avatar
---------------------------------
Given a user object or userId string, Avatar will retrieve the user's image with the following priority:
  1. Twitter
  2. Facebook
  3. Google
  4. GitHub
  5. Instagram
  6. Gravatar, which will try to return an avatar matching the user's email address/hash. If it can't find one, then:
    - If `Avatar.options.defaultType` is "image" and `Avatar.options.gravatarDefault` is valid, Gravatar will return a default image (e.g. an identicon).
    - If `Avatar.options.defaultType` is "image" and `Avatar.options.gravatarDefault` is invalid or undefined, Gravatar will return either the image referenced by `Avatar.options.defaultImageUrl` or the included default image.
    - Else, Gravatar returns a 404 (Not Found) response, and...
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
