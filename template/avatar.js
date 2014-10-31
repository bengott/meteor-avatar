Template.avatar.helpers({

  class: function () {
    var c = this.class;
    // If image loaded successfully, hide initials (show image).
    // Else, hide image (show initials)
    c += Template.instance().hasImage.get() ? ' hideInitials' : ' hideImage';
    return c;
  },

  style: function () {
    var style = '';
    if (this.bgColor)  style += 'background-color: ' + this.bgColor + ';';
    if (this.txtColor) style += 'color: ' + this.txtColor + ';';
    return style;
  },

  url: function () {
    var user = this.user ? this.user : Meteor.users.findOne(this.userId);
    return Avatar.getUrl(user);
  },

  initials: function () {
    var user = this.user ? this.user : Meteor.users.findOne(this.userId);
    return this.initials || Avatar.getInitials(user);
  }

});

// Use a reactive variable to store image load success/failure
Template.avatar.created = function () {
  this.hasImage = new ReactiveVar(true);
};

// Determine if image loaded successfully and set hasImage variable
Template.avatar.rendered = function () {
  var self = this;
  this.$('img').on('error', function () { self.hasImage.set(false); })
               .on('load',  function () { self.hasImage.set(true); });
};
