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

// Get the user's email address or (if the emailHashProperty is defined) hash
getEmailOrHash = function (user) {
  var emailOrHash;
  if (Avatar.options.emailHashProperty) {
    emailOrHash = user[Avatar.options.emailHashProperty];
  }
  else if (user.emails) {
    emailOrHash = user.emails[0].address; // TODO: try all emails
  }
  return emailOrHash;
};