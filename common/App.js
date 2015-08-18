App = {
  canDeleteMessage: function(messageUsername) {
    return messageUsername == Meteor.user().username ||
      Roles.userIsInRole(Meteor.userId(), 'admin', 'all');
  }
};