Template.avatar.helpers({
  url: function () {
    var user;
    if      (this.user)   { user = this.user; }
    else if (this.userId) { user = Meteor.users.findOne(this.userId); }
    return getUrl(user);
  },
  cssClass: function () {
    if (this.cssClass) { return this.cssClass; }
    return 'avatar';
  }
});