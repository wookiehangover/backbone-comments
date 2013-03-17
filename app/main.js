define(function(require, exports, module){

  var $ = require('jquery');
  var App = require('./app');

  $(function(){
    window.comments = new App();
  });

});
