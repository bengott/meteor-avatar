// Avatar object to be exported
Avatar = {
  
  options: {
    // If defined (e.g. from a startup config file in your app), this property on the user object
    // will be used for retrieving gravatars (useful when user emails are not published) 
    emailHashProperty: '',
    // If defined (e.g. from a startup config file in your app), this will replace default avatar url
    defaultAvatarUrl: ''
  },

  // Get the url of the user's avatar
  getUrl: function (user) {
    var url;
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
        var options = {
          s: 200, // use 200x200 like twitter and facebook above (might be useful later)
          secure: location.protocol === 'https:'
        };
        url = Gravatar.imageUrl(getEmailHash(user), options);
      }
    }
    // If all else fails, default image
    if (Avatar.options.defaultAvatarUrl) {
      url = Avatar.options.defaultAvatarUrl;
    } else {
      url = '/packages/bengott_avatar/default.png';
    }
    return url;
  }
};

// Get the account service to use for the user's avatar
// Priority: Twitter > Facebook > Google > GitHub > Instagram
var getService = function (user) {
  if      (user.services && user.services.twitter)   { return 'twitter'; }
  else if (user.services && user.services.facebook)  { return 'facebook'; }
  else if (user.services && user.services.google)    { return 'google'; }
  else if (user.services && user.services.github)    { return 'github'; }
  else if (user.services && user.services.instagram) { return 'instagram'; }
  else                                               { return 'none'; }
};

// Get the email hash, either from the specified emailHashProperty (pre-generated)
// or by generating a hash from the user's email address
var getEmailHash = function (user) {
  var emailHash;
  if (Avatar.options.emailHashProperty) {
    emailHash = user[Avatar.options.emailHashProperty];
  }
  else if (user.emails) {
    var email = user.emails[0].address; // TODO: try all emails
    emailHash = Gravatar.hash(email);
  }
  return emailHash;
};

// Adapted from jparker:gravatar 0.2.0
// Pulled the hash step outside of the imageUrl function in order to support
// pre-generated hashes (e.g. when user emails not published to all clients)
var Gravatar = {
  hash: function (email) {
    return CryptoJS.MD5(email.trim().toLowerCase());
  },

  imageUrl: function (emailHash, options) {
    options = options || {};

    // Want HTTPS?
    var url = options.secure ?
      'https://secure.gravatar.com/avatar/' : 'http://www.gravatar.com/avatar/';
    
    url += emailHash;

    delete options.secure;

    // Have any options to pass?
    var params = _.map(options, function (val, key) {
      return key + '=' + encodeURIComponent(val);
    }).join('&');

    if (params.length > 0) {
      url += '?' + params;
    }

    return url;
  }
};