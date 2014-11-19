Template.avatar.helpers({

  size: function () {
    var valid = ['large', 'small'];
    return _.contains(valid, this.size) ? 'avatar-' + this.size : '';
  },

  dimensions: function () {
    var value;
    if      (this.size === 'small') value = 30;
    else if (this.size === 'large') value = 80;
    else                            value = 40;

    return { width: value, height: value };
  },

  shape: function () {
    var valid = ['rounded', 'circle'];
    return _.contains(valid, this.shape) ? 'avatar-' + this.shape : '';
  },

  hideClass: function () {
    // If image loaded successfully, hide initials. Else, hide image.
    return Template.instance().hasImage.get() ? 'avatar-hide-initials' : 'avatar-hide-image';
  },

  class: function () { return this.class; },

  imageUrl: function () {
    var user = this.user ? this.user : Meteor.users.findOne(this.userId);
    return Avatar.getUrl(user);
  },

  initialsCss: function () {
    var css = '';
    if (this.bgColor)  style += 'background-color: ' + this.bgColor + ';';
    if (this.txtColor) style += 'color: ' + this.txtColor + ';';
    return css;
  },

  initialsText: function () {
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
