Messages = new Mongo.Collection('messages');
var Schemas = {};
Schemas.Messages = new SimpleSchema({
  text: {
    type: String
  },
  timestamp: {
    type: Number
  },
  username: {
    type: String
  }
});

Messages.attachSchema(Schemas.Messages);