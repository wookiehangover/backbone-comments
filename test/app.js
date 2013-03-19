/*globals test,ok,equal,deepEqual*/
define(['app'], function(App){

  module('App Instance', {
    teardown: function(){
      if( this.app ){
        this.app.remove();
      }
    }
  });

  test('should initialize with a Comment Collection', 1, function(){
    this.app = new App();
    ok(this.app.collection);
  });

  test('createComment should add a valid comment to the collection', 3, function(){
    this.app = new App({ el: $('<div>') });
    this.app.$el.html('<form><input name="email" value="test@t.com"><textarea>foo</textarea></form>');
    this.app.createComment({ preventDefault: $.noop });
    equal(this.app.collection.length, 1);
    equal(this.app.collection.first().get('email'), 'test@t.com');
    equal(this.app.collection.first().get('content'), 'foo');
  });

  test('invalid comments should be discarded', 1, function(){
    this.app = new App();
    this.app.createComment({ preventDefault: $.noop });
    equal(this.app.collection.length, 0);
  });

});
