Router.route('/', {
  name: 'hello',
  waitOn: function() {
    return Meteor.subscribe('messages', 7);
  }
});

Router.route('/users/:username', {
  name: 'userProfile',
  waitOn: function() {
    return Meteor.subscribe('userMessages', this.params.username);
  },
  data: function() {
    return {
      username: this.params.username,
      messages: Messages.find()
    };
  }
});

Router.configure({
  layoutTemplate: 'layout'
});