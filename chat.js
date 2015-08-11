Messages = new Mongo.Collection('messages');

if (Meteor.isClient) {
  Meteor.subscribe('messages', 7);
  Accounts.ui.config({
    passwordSignupFields: 'USERNAME_AND_EMAIL'
  });

  Template.hello.helpers({
    messages: function() {
      return Messages.find({}, { sort: { timestamp: -1 }});
    },
    formatDate: function(timestamp) {
      var date = new Date(timestamp);
      return date.toLocaleString();
    }
  });

  Template.hello.events({
    'submit #chat-form': function(e) {
      e.preventDefault();
      var form = e.target;
      var message = form.message.value;
      Meteor.call('addMessage', message, function(err, result) {
        if (err) {
          alert(err.reason);
        } else {
          console.log('result: ', result);
        }
      });
      form.reset();
    }
  });
}

if (Meteor.isServer) {
  Meteor.methods({
    addMessage: function(message) {
      if (!message) {
        throw new Meteor.Error('required-message', 'Write something!');
      }
      if (!Meteor.user()) {
        throw new Meteor.Error('required-login', 'You must be logged in to add a message');
      }
      return Messages.insert({
        username: Meteor.user().username,
        text: message,
        timestamp: Date.now()
      });
    }
  });
  
  Meteor.publish('messages', function(limit) {
    if (this.userId) {
      return Messages.find({}, {
        limit: limit || 5,
        sort: { timestamp: -1 }
      });
    }
    this.ready();
  });
}
