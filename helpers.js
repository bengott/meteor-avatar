// Avatar object to be exported
Avatar = {
  
  options: {
    // If defined (e.g. from a startup config file in your app), this property on the user object
    // will be used for retrieving gravatars (useful when user emails are not published) 
    emailHashProperty: '',
    // If defined (e.g. from a startup config file in your app), this property will replace default avatar url
    defaultAvatar: ''
  },

  // Get the url of the user's avatar, either from twitter, facebook, or gravatar (for now)
  getUrl: function (user) {
    if (user) {
      var svc = getService(user);      
      if (svc === 'twitter') {
        // use larger image (200x200 is smallest custom option)
        return user.services.twitter.profile_image_url.replace('_normal.', '_200x200.');
      }
      else if (svc === 'facebook') {
        // use larger image (~200x200)
        return 'http://graph.facebook.com/' + user.services.facebook.id + '/picture?type=large';
      }
      else if (svc === 'google') {        
        return user.services.google.picture;
      }
      else if (svc === 'github') {        
        return 'http://avatars.githubusercontent.com/u/' + user.services.github.id + '?v=2';
      }            
      else if (svc === 'none') {
        var options = {
          s: 200, // use 200x200 like twitter and facebook above (might be useful later)
          secure: location.protocol === 'https:'
        };
        return Gravatar.imageUrl(getEmailHash(user), options);
      }
    }
    // If all else fails, default image
    if (Avatar.options.defaultAvatar) {
      return Avatar.options.defaultAvatar;
    }
    return '/packages/bengott_avatar/default.png';
  }
};

// Get the account service to use for the user's avatar
// Priority: Twitter > Facebook > (more to come...)
var getService = function (user) {
  if      (user.services && user.services.twitter)  { return 'twitter'; }
  else if (user.services && user.services.facebook) { return 'facebook'; }
  else if (user.services && user.services.google) { return 'google'; }
  else if (user.services && user.services.github) { return 'github'; }
  else                                              { return 'none'; }
};

// Get the email hash, either from the specified emailHashProperty (pre-generated)
// or by generating a hash from the user's email address
var getEmailHash = function (user) {
  var emailHash;
  if (Avatar.options.emailHashProperty) {
    emailHash = user[Avatar.options.emailHashProperty];
  } else if (user.emails) {
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