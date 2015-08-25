describe('Chat', function() {
  it('should be welcome message on the page', function() {
    expect($('h1').text()).toEqual('Welcome to advanced Meteor!');
  });
  it('should have an empty textarea on the page', function() {
    expect($("textarea").val()).toEqual("");
  });
});