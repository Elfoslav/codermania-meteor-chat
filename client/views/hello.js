Template.hello.helpers({
  messages: function() {
    return Messages.find({}, { sort: { timestamp: -1 }});
  },
  formatDate: function(timestamp) {
    var date = new Date(timestamp);
    return date.toLocaleString();
  },
  canDelete: function() {
    return App.canDeleteMessage(this.username);
  }
});

Template.hello.events({
  'submit #chat-form': function(e) {
    e.preventDefault();
    var form = e.target;
    var message = form.message.value;
    form.message.value = '';
    Meteor.call('addMessage', message, function(err, result) {
      if (err) {
        alert(err.reason);
        form.message.value = message;
      } else {
        form.reset();
        console.log('result: ', result);
      }
    });
  },
  'click .click-me': function(evt, tpl) {
    console.log(this);
  },
  'click .delete-msg': function(evt, tpl) {
    Messages.remove(this._id);
  }
});