Messages.allow({
  remove: function(userId, doc) {
    return App.canDeleteMessage(doc.username);
  }
});

Meteor.publish('messages', function(limit) {
  check(limit, Match.Optional(Number));
  if (this.userId) {
    return Messages.find({}, {
      limit: limit || 5,
      sort: { timestamp: -1 }
    });
  }
  this.ready();
});

Meteor.publish('userMessages', function(username) {
  check(username, String);
  return Messages.find({
    username: username
  });
});

Meteor.startup(function() {
  var elfoslav = Meteor.users.findOne({ username: 'elfoslav' });
  if (elfoslav) {
    Roles.addUsersToRoles(elfoslav._id, ['admin'], 'all');
  }
});
