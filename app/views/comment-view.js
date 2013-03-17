define(function(require, exports, module){

  var Backbone = require('backbone');

  module.exports = Backbone.View.extend({

    tagName: 'li',

    template: require('tpl!templates/comment.ejs'),

    initialize: function(){
      if( !this.model ){
        throw new Error('You must provide a Comment model');
      }
    },

    render: function(){
      this.$el.html( this.template( this ) );
      return this.el;
    }

  });

});
