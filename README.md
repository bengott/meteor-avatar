![avatar](https://raw.githubusercontent.com/bengott/images/master/avatar.png)
Avatar
======

Consolidated Avatar Template Package for Meteor


Installation
------------
In your Meteor project directory, run:  
```
$ meteor add bengott:avatar
```
Usage 
-----
In an HTML file:
```
{{> avatar (user=<user> || userId=<userId>) (cssClass='avatar (large) (rounded || circle)')}}
```
Optional template parameters:
  1. either a user object or userId (if neither -> default avatar)
  2. css class string, where you can optionally specify 'large' and 'rounded' or 'circle'  
  NOTE: for now, if you want to use 'large', 'rounded', and/or 'circle', you must include 'avatar' also. Otherwise, you can specify a custom class string to override the default style with your own CSS. (e.g. `{{> avatar}}`, or `{{> avatar user=user}}`, or `{{> avatar userId=this.userId cssClass='avatar large circle'`, or `{{> avatar user=this.user cssClass='<your custom css string>'`, etc.)

How the package chooses an avatar
---------------------------------
Given a user object or userId, Avatar will retrieve the user's image with the following priority:
  1. Twitter
  2. Facebook
  3. Gravatar
  4. More to come...

Eventually, the plan is to add more UI to allow the user to select which one he/she wants, or upload a new image.

Credits
-------
- [Sacha Greif](@SachaG), for [suggesting the idea on crater.io](http://crater.io/posts/BfMsgzs5AzEdp6Byu)
- [Shai Alon](@shaialon), for [contributing the Gravatar functionality to  Telescope](https://github.com/TelescopeJS/Telescope/pull/436) that [I later modified](https://github.com/TelescopeJS/Telescope/pull/438)
- [Jérémie Parker](@p-j), for providing the [gravatar package](https://github.com/p-j/meteor-gravatar)
