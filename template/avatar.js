Template.avatar.helpers({

  hasImage: function() {
    Template.instance().hasImageDep.depend();
    return Template.instance().hasImage
  },

  // If the input {{class}} string is empty or contains only modifier
  // classes ('large', 'rounded', 'circle'), return 'avatar ' + {{class}}.
  // Otherwise, the input string is custom CSS, so return it unmodified. This
  // also preserves backward compatibility when 'avatar (+ mods)' is specified.
  class: function () {
    var input, output;
    // Support {{cssClass}} for backward compatibility
    input = (this.cssClass && !this.class) ? this.cssClass : this.class;
    if (input) {
      var mods = ['large', 'small', 'rounded', 'circle'];
      var classes = input.split(' ');
      var onlyMods = _.every(classes, function (c) { return _.contains(mods, c); });
      output = (onlyMods) ? 'avatar ' + input : input;  
    } else { 
      output = 'avatar';
    }
    return output;
  },

  style: function() {
    var style;

    if(this.background) {
      style = "background: " + this.background + ";";
    }
    if(this.color) {
      style += "color: " + this.color + ";";
    }

    return style;
  },

  avatar: function () {
    var user;

    if (this.user) {
      user = this.user;
    }
    else if (this.userId) {
      user = Meteor.users.findOne(this.userId);
    }

    return {
      initials: this.initials ? this.initials : Avatar.getInitials(user),
      url: Avatar.getUrl(user)
    };
  }
});

Template.avatar.created = function() {
  this.hasImage = true;
  this.hasImageDep = new Deps.Dependency();
};

Template.avatar.rendered = function onRendered() {
  var self = this;
  var avatar = $('.avatar');

  avatar.on('error', function onError(){
    self.hasImage = false;
    self.hasImageDep.changed();
  });

  avatar.on('load', function onLoad(){
    self.hasImage = true;
    self.hasImageDep.changed();
  });
};