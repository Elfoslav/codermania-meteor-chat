Router.route('/', {
  name: 'chat',
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

Router.route('/create-chat-room', {
  name: 'createChatRoom',
  onBeforeAction: function() {
    if (!Meteor.userId()) {
      this.redirect('chat');
    } else {
      this.next();
    }
  }
});

Router.route('/chat-rooms', {
  name: 'chatRooms',
  waitOn: function() {
    return Meteor.subscribe('chatRooms');
  },
  data: function() {
    return {
      chatRooms: ChatRooms.find()
    };
  }
});

Router.route('/chat-room/:_id', {
  name: 'chatRoom',
  waitOn: function() {
    return [
      Meteor.subscribe('chatRoom', this.params._id),
      Meteor.subscribe('chatRoomMessages', this.params._id)
    ];
  },
  data: function() {
    return {
      chatRoom: ChatRooms.findOne(this.params._id)
    };
  }
});

Router.configure({
  layoutTemplate: 'layout'
});