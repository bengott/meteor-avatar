// Avatar object to be exported
Avatar = {
  
  // If defined (e.g. from a startup config file in your app), these options
  // override default functionality
  options: {
    
    // This property on the user object will be used for retrieving gravatars
    // (useful when user emails are not published)
    emailHashProperty: '',
    
    // This will replace the standard default avatar URL. It can be a relative
    // path (e.g. '/images/defaultAvatar.png')
    defaultAvatarUrl: ''
  },

  // Get the url of the user's avatar
  getUrl: function (user) {
    
    var url, defaultUrl;

    if (Avatar.options.defaultAvatarUrl) {
      defaultUrl = Avatar.options.defaultAvatarUrl;
    } else {
      defaultUrl = '/packages/bengott_avatar/default.png';
    }
    // If it's a relative path, complete the URL (prepend the origin)
    if (defaultUrl.charAt(0) === '/' && defaultUrl.charAt(1) !== '/') {
      defaultUrl = location.origin + defaultUrl;
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
        // NOTE: Gravatar's default option requires a publicly accessible URL,
        // so it won't work when your app is running on localhost and you're
        // using either the standard default URL or a custom defaultAvatarUrl
        // that is a relative path (e.g. '/images/defaultAvatar.png').
        var options = {
          default: defaultUrl,
          size: 200, // use 200x200 like twitter and facebook above (might be useful later)
          secure: location.protocol === 'https:'
        };
        url = Gravatar.imageUrl(getEmailOrHash(user), options);
      }
    } else {
      url = defaultUrl;
    }

    return url;
  }
};