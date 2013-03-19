config =
  cssmin:
    compress:
      files:
        'css/backbone-comments.css': [
          'css/normalize.css'
          'css/main.css'
        ]
      options:
        keepSpecialComments: 0

  requirejs:
    compile:
      options:
        mainConfigFile: 'app/config.js'
        name: 'config'
        out: 'app/backbone-comments.js'
        optimize: 'uglify2'
        wrap: false
        preserveLicenseComments: false
        almond: true

  qunit:
    all: ['test/index.html']

module.exports = (grunt) ->

  grunt.initConfig( config )

  grunt.loadNpmTasks('grunt-requirejs')
  grunt.loadNpmTasks('grunt-contrib-qunit')
  grunt.loadNpmTasks('grunt-contrib-cssmin')

  grunt.registerTask('default', [
    'requirejs'
    'cssmin'
  ])
