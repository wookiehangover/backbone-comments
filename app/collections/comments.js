define(function(require, exports, module){

  var Backbone = require('backbone');
  var CommentModel = require('models/comment');

  module.exports = Backbone.Collection.extend({
    model: CommentModel
  });

});
