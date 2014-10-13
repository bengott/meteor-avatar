// Get the account service to use for the user's avatar
// Priority: Twitter > Facebook > Google > GitHub > Instagram
getService = function (user) {
  if      (user.services && user.services.twitter)   { return 'twitter'; }
  else if (user.services && user.services.facebook)  { return 'facebook'; }
  else if (user.services && user.services.google)    { return 'google'; }
  else if (user.services && user.services.github)    { return 'github'; }
  else if (user.services && user.services.instagram) { return 'instagram'; }
  else                                               { return 'none'; }
};

// Get the email hash, either from the specified emailHashProperty (pre-generated)
// or by generating a hash from the user's email address
getEmailHash = function (user) {
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
Gravatar = {
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