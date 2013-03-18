define(function(require, exports, module){

  var $ = require('jquery');
  var Backbone = require('backbone');

  var CommentView = require('views/comment-view');
  var CommentsCollection = require('collections/comments');
  var PersonaModel = require('models/persona');

  module.exports = Backbone.View.extend({

    el: $('.comments'),

    initialize: function(){
      this.persona = new PersonaModel();
      this.collection = new CommentsCollection();

      this.listenTo( this.collection, 'add', this.renderComment );
      this.listenTo( this.collection, 'remove', this.renderCommentCount );

      this.listenTo( this.persona, 'change:email', this.renderPersona );
    },

    renderComment: function(model){
      model.view = new CommentView({ model: model });
      var comment = model.view.render().hide();
      this.$('#comment-list').prepend( comment.delay(200).slideDown(200) );

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
      'submit form': 'createComment',
      'click .sign-in': 'createPersona'
    },

    createComment: function(event){
      event.preventDefault();

      // Create a new Comment Model with the data in the form
      var comment = {
        content: this.$('form textarea').val(),
        email: this.persona.get('email'),
        created_at: +new Date()
      };
      // The `validate` option ensures that empty comments aren't added
      this.collection.add( comment, { validate: true });
    },

    createPersona: function(event){
      event.preventDefault();
      navigator.id.request();
    },

    renderPersona: function(model, email){
      this.$('.sign-in').hide();
      this.$('button').text('Post as '+email).show();
    }

  });

});
