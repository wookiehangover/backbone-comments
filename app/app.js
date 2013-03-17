define(function(require, exports, module){

  var $ = require('jquery');
  var Backbone = require('backbone');

  var CommentView = require('views/comment-view');
  var CommentsCollection = require('collections/comments');

  module.exports = Backbone.View.extend({

    el: $('.comments'),

    initialize: function(){
      this.collection = new CommentsCollection();
      this.listenTo( this.collection, 'add', this.renderComment );
    },

    renderComment: function(model){
      model.view = new CommentView({ model: model });
      this.$('#comment-list').append( model.view.render() );

      this.resetFormFields();
      this.renderCommentCount();
    },

    resetFormFields: function(){
      this.$('form textarea, form input[name="email"]').val(null);
    },

    renderCommentCount: function(){
      var length = this.collection.length;
      var count = length === 1 ? '1 Comment' : length + ' Comments';
      this.$('.comment-count').text( count );
    },

    events: {
      'submit form': 'createComment'
    },

    createComment: function(event){
      event.preventDefault();

      // Create a new Comment Model with the data in the form
      var comment = {
        content: this.$('form textarea').val(),
        email: this.$('form input[name="email"]').val(),
        created_at: +new Date()
      };
      // The `validate` option ensures that empty comments aren't added
      this.collection.add( comment, { validate: true });
    }

  });

});
