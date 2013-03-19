require.config({
  deps: ['test/main'],

  baseUrl: '../app',

  paths: {
    jquery: '../components/jquery/jquery',
    underscore: '../components/lodash/lodash',
    backbone: '../components/backbone-amd/backbone',
    markdown: '../components/markdown/lib/markdown',
    moment: '../components/moment/moment',
    tpl: '../components/requirejs-tpl/tpl',
    'backbone.localStorage': '../components/backbone.localStorage/backbone.localStorage',

    test: "../test"
  },

  shim: {
    markdown: {
      exports: 'markdown'
    }
  }
});
