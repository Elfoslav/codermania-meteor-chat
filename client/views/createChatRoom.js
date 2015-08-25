Template.createChatRoom.events({
  'submit #create-chat-room': function(e) {
    e.preventDefault();
    var name = e.target.name.value;
    Meteor.call('createChatRoom', name, function(err, chatRoomId) {
      if (err) {
        alert(err.reason);
      } else {
        Router.go('chatRoom', { _id: chatRoomId });
      }
    });
  }
});