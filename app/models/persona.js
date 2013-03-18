define(function(requre, exports, module){

  var _ = require('underscore');
  var $ = require('jquery');
  var Backbone = require('backbone');

  module.exports = Backbone.Model.extend({

    url: 'http://wookiehangover.com:9001/auth/login',

    initialize: function(){
      navigator.id.watch({
        loggedInUser: null,
        onlogin: _.bind(this.onLogin, this),
        onlogout: function(){}
      });
    },

    onLogin: function(assertion){
      var model = this;

      $.ajax({
        url: this.url,
        type: 'post',
        data: {
          assertion: assertion
        },
        xhrFields: {
          withCredentials: true
        }
      }).then(function(data, status, xhr){
        model.set(data);
      });
    }

  });

});
