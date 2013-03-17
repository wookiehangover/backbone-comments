define(function(require, exports, module){

  var Backbone = require('backbone');

  module.exports = Backbone.Model.extend({
    validate: function(attrs){
      if( !attrs.email ){
        return 'Email address is required';
      }

      if( !attrs.content ){
        return 'You have to say something in your comment';
      }
    }
  });

});
