define(function(require, exports, module){

  var $ = require('jquery');
  var Backbone = require('backbone');
  var CommentView = require('views/comment-view');

  module.exports = Backbone.View.extend({

    el: $('.comments'),

    initialize: function(){
      this.collection = new Backbone.Collection();

      this.listenTo( this.collection, 'add', this.renderComment );
    },

    events: {
      'submit form': 'createComment'
    },

    createComment: function(event){
      event.preventDefault();

      var comment = {
        content: this.$('form textarea').val(),
        email: this.$('form input[name="email"]').val(),
        created_at: +new Date()
      };

      this.collection.add( comment );
    },

    renderComment: function(model){
      model.view = new CommentView({ model: model });
      this.$('#comment-list').append( model.view.render() );
    }

  });

});
