Messages.allow({
  remove: function(userId, doc) {
    return App.canDeleteMessage(doc.username);
  }
});

Meteor.publish('messages', function(limit) {
  check(limit, Match.Optional(Number));
  if (this.userId) {
    return Messages.find({
      chatRoomId: undefined
    }, {
      limit: limit || 5,
      sort: { timestamp: -1 }
    });
  }
  this.ready();
});

Meteor.publish('chatRoomMessages', function(chatRoomId) {
  check(chatRoomId, String);
  return Messages.find({
    chatRoomId: chatRoomId
  }, {
    limit: 20
  });
});

Meteor.publish('userMessages', function(username) {
  check(username, String);
  return Messages.find({
    username: username
  });
});

Meteor.publish('chatRoom', function(id) {
  check(id, String);
  return ChatRooms.find({
    _id: id
  });
});

Meteor.publish('chatRooms', function() {
  return ChatRooms.find();
});

Meteor.startup(function() {
  var elfoslav = Meteor.users.findOne({ username: 'elfoslav' });
  if (elfoslav) {
    Roles.addUsersToRoles(elfoslav._id, ['admin'], 'all');
  }
});
