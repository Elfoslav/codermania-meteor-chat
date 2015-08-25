Meteor.methods({
  addMessage: function(data) {
    check(data, {
      message: String,
      chatRoomId: Match.Optional(String)
    });
    //Code used for demonstration of latency compensation
//    if (Meteor.isServer)
//      Meteor._sleepForMs(2000);
    
    if (!data.message) {
      throw new Meteor.Error('required-message', 'Write something!');
    }
    if (!Meteor.userId()) {
      throw new Meteor.Error('required-login', 'You must be logged in to add a message');
    }
    console.log('Adding message: ', new Date());
    if (Meteor.isServer) {
      //Uncomment this line to see what will happen
      //throw new Meteor.Error('msg err', 'An error occured!');
    }
    return Messages.insert({
      username: Meteor.user().username,
      text: data.message,
      timestamp: Date.now(),
      chatRoomId: data.chatRoomId
    });
  },
  createChatRoom: function(name) {
    check(name, String);
    if (!name) {
      throw new Meteor.Error('chat-room-err', 'Name of the room cannot be empty');
    }
    if (!Meteor.userId()) {
      throw new Meteor.Error('required-login', 'You must be logged in to create a chat room');
    }
    return ChatRooms.insert({
      name: name,
      userId: Meteor.userId(),
      timestamp: Date.now()
    });
  }
});