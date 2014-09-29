getUrl = function (user) {
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
    else if (svc === 'none' && user.emails) {
      var email = user.emails[0].address; // TODO: try all emails? only verified emails?
      var options = {
        s: 100,
        secure: location.protocol === 'https:'
      };
      return Gravatar.imageUrl(email, options);
    }
  }
  // If all else fails, default image
  return '/packages/bengott_avatar/default.png';
};

// Priority: Twitter > Facebook > (more to come...)
var getService = function (user) {
  if      (user.services && user.services.twitter)  { return 'twitter'; }
  else if (user.services && user.services.facebook) { return 'facebook'; }
  else                                              { return 'none'; }
};

