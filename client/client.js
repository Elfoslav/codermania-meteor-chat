Accounts.ui.config({
  passwordSignupFields: 'USERNAME_AND_EMAIL'
});

Template.registerHelper('formatDate', function(timestamp) {
  var date = new Date(timestamp);
  return date.toLocaleString();
});