Template.avatar.helpers({
  
  url: function () {
    var user;
    if      (this.user)   { user = this.user; }
    else if (this.userId) { user = Meteor.users.findOne(this.userId); }
    return Avatar.getUrl(user);
  },
  
  // If the input {{class}} string is empty or contains only modifier
  // classes ('large', 'rounded', 'circle'), return 'avatar ' + {{class}}.
  // Otherwise, the input string is custom CSS, so return it unmodified. This
  // also preserves backward compatibility when 'avatar (+ mods)' is specified.
  class: function () {
    var input, output;
    // Support {{cssClass}} for backward compatibility
    input = (this.cssClass && !this.class) ? this.cssClass : this.class;
    console.log('LOL');
    if (input) {
      var mods = ['large', 'rounded', 'circle'];
      var classes = input.split(' ');
      var onlyMods = _.every(classes, function (c) { return _.contains(mods, c); });
      output = (onlyMods) ? 'avatar ' + input : input;  
    } else { 
      output = 'avatar';
    }
    return output;
  }

});