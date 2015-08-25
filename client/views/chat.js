Template.chat.helpers({
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

Template.chat.events({
  'submit #chat-form': function(e) {
    e.preventDefault();
    var form = e.target;
    var data = {
      message: form.message.value,
      chatRoomId: Router.current().params._id
    };
    form.message.value = '';
    Meteor.call('addMessage', data, function(err, result) {
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