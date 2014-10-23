// Avatar object to be exported
Avatar = {
  
  // If defined (e.g. from a startup config file in your app), these options
  // override default functionality
  options: {
    
    // This property on the user object will be used for retrieving gravatars
    // (useful when user emails are not published).
    emailHashProperty: '',

    // This will replace the standard default avatar URL. It can be a relative
    // path (relative to website's base URL, e.g. 'images/defaultAvatar.png').
    defaultAvatarUrl: '',

    // Gravatar default option to use (overrides default avatar URL)
    // Options are available at:
    // https://secure.gravatar.com/site/implement/images/#default-image
    gravatarDefault: ''
  },

  // Get the initials of the user
  getInitials: function (user) {
    var initials = "";

    if(!user) {
      return;
    }

    if(user.profile && user.profile.firstName) {
      initials = user.profile.firstName.charAt(0).toUpperCase();

      if(user.profile.lastName) {
        initials += user.profile.lastName.charAt(0).toUpperCase();
      }
      else if(user.profile.familyName) {
        initials += user.profile.familyName.charAt(0).toUpperCase();
      }
      else if(user.profile.secondName) {
        initials += user.profile.secondName.charAt(0).toUpperCase();
      }
      else if(user.profile.name) {
        initials += user.profile.name.charAt(0).toUpperCase();
      }
    }
    else if(user.profile && user.profile.name) {
      user.profile.name.split(" ").forEach(function(part){
        initials += part.charAt(0).toUpperCase();
      });
    }

    return initials ? initials : null;
  },

  // Get the url of the user's avatar
  getUrl: function (user) {

    var url, defaultUrl;

    defaultUrl = Avatar.options.defaultAvatarUrl;

    // If it's a relative path (no '//' anywhere), complete the URL
    if (defaultUrl.indexOf('//') === -1) {
      // Strip starting slash if it exists
      if (defaultUrl.charAt(0) === '/') defaultUrl = defaultUrl.slice(1); 
      // Put it all together
      defaultUrl = window.location.origin + '/' + defaultUrl;
    }

    if (user) {
      var svc = getService(user);
      if (svc === 'twitter') {
        // use larger image (200x200 is smallest custom option)
        url = user.services.twitter.profile_image_url.replace('_normal.', '_200x200.');
      }
      else if (svc === 'facebook') {
        // use larger image (~200x200)
        url = 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?type=large';
      }
      else if (svc === 'google') {        
        url = user.services.google.picture;
      }
      else if (svc === 'github') {
        url = 'http://avatars.githubusercontent.com/u/' + user.services.github.id + '?v=2';
      }
      else if (svc === 'instagram') {
        url = user.services.instagram.profile_picture;
      }
      else if (svc === 'none') {
        var validGravatars = ['404', 'mm', 'identicon', 'monsterid', 'wavatar', 'retro', 'blank'];
        if (_.contains(validGravatars, Avatar.options.gravatarDefault)) {
          gravatarDefault = Avatar.options.gravatarDefault;
        }
        else {
          gravatarDefault = '404';
        }

        var options = {
          // NOTE: Gravatar's default option requires a publicly accessible URL,
          // so it won't work when your app is running on localhost and you're
          // using either the standard default URL or a custom defaultAvatarUrl
          // that is a relative path (e.g. 'images/defaultAvatar.png').
          default: gravatarDefault || defaultUrl,
          size: 200, // use 200x200 like twitter and facebook above (might be useful later)
          secure: location.protocol === 'https:'
        };

        var emailOrHash = getEmailOrHash(user);
        url = emailOrHash && Gravatar.imageUrl(emailOrHash, options) || defaultUrl;
      }
    } else {
      url = defaultUrl;
    }

    return url;
  }
};