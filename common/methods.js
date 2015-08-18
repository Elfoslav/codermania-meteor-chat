Meteor.methods({
  addMessage: function(message) {
    //Code used for demonstration of latency compensation
    if (Meteor.isServer)
      Meteor._sleepForMs(2000);
    
    if (!message) {
      throw new Meteor.Error('required-message', 'Write something!');
    }
    if (!Meteor.user()) {
      throw new Meteor.Error('required-login', 'You must be logged in to add a message');
    }
    console.log('Adding message: ', new Date());
    if (Meteor.isServer) {
      //Uncomment this line to see what will happen
      //throw new Meteor.Error('msg err', 'An error occured!');
    }
    return Messages.insert({
      username: Meteor.user().username,
      text: message,
      timestamp: Date.now()
    });
  }
});