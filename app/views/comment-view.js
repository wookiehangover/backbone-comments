define(function(require, exports, module){

  var _ = require('underscore');
  var Backbone = require('backbone');
  var markdown = require('markdown');
  var moment = require('moment');

  module.exports = Backbone.View.extend({

    tagName: 'li',

    timer_refresh: 60e3,

    template: require('tpl!templates/comment.ejs'),

    initialize: function(){
      if( !this.model ){
        throw new Error('You must provide a Comment model');
      }

      this.listenTo( this.model, 'remove', this.remove);

      _.bindAll(this, 'updateTime');
      this.timer = setTimeout(this.updateTime, this.timer_refresh);
    },

    render: function(){
      this.$el.html( this.template( this ) );
      return this.$el;
    },

    formatDate: function(){
      var date = moment( this.model.get('created_at') );
      return date.fromNow();
    },

    renderMarkdown: function(){
      return markdown.toHTML( this.model.get('content') );
    },

    updateTime: function(){
      this.$('.date').text( this.formatDate() );
      this.timer = setTimeout(this.updateTime, this.timer_refresh);
    },

    // Overload remove to clean up the timer, if it's running
    remove: function(){
      if( this.timer ){
        clearTimeout( this.timer );
      }
      this.$el.slideUp(_.bind(function(){
        Backbone.View.prototype.remove.call(this);
      }, this));
    }

  });

});
