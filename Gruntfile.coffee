module.exports = (grunt) ->
  'use strict'

  # Project configuration.
  grunt.initConfig
    # Metadata.
    pkg: grunt.file.readJSON 'package.json'

    # Parse CSS and add vendor-prefixed CSS properties using the Can I Use database.
    autoprefixer:
      options:
        browsers: ['Safari > 5']
      dist:
        src: 'css/app.css'

    # Start a static web server.
    # Reload assets live in the browser
    connect:
      app:
        options:
          port: 8080
          base: ''

    concat:
      app:
        src: [
          'src/javascripts/lib/jquery/jquery.js',
          'src/javascripts/lib/underscore/underscore.js',
          'src/javascripts//lib/backbone/backbone.js',
          'src/javascripts/main.js'
        ]
        dest: 'js/app.js' 

    # Sort CSS properties in specific order.
    csscomb:
      dist:
        options:
          config: '.csscombrc'
        files:
          'css/app.css': ['css/app.css']

    # Lint CSS files.
    csslint:
      dist:
        options:
          csslintrc: '.csslintrc'
        src: ['css/app.css']

    # Minify CSS files with CSSO.
    csso:
      dist:
        files:
          'css/app.min.css': ['css/app.css']

    # Grunt task to compile Sass SCSS to CSS
    sass:
      dist:
        files:
          'css/app.css': 'src/stylesheets/app.scss'

    # Run tasks whenever watched files change.
    watch:
      options:
        livereload: true
      css:
        files: ['src/stylesheets/**/*.scss']
        tasks: ['stylesheet']
      js:
        files: ['src/javascripts/**/*.js']
        tasks: ['script']

  # Load the plugins.
  grunt.loadNpmTasks 'grunt-sass'
  grunt.loadNpmTasks 'grunt-csso'
  grunt.loadNpmTasks 'grunt-csscomb'
  grunt.loadNpmTasks 'grunt-webfont'
  grunt.loadNpmTasks 'grunt-autoprefixer'
  grunt.loadNpmTasks 'grunt-contrib-watch'
  grunt.loadNpmTasks 'grunt-contrib-connect'
  grunt.loadNpmTasks 'grunt-contrib-concat'
  grunt.loadNpmTasks 'grunt-contrib-csslint'


  # Tasks.
  grunt.registerTask 'default', ['develop']
  grunt.registerTask 'stylesheet', ['sass', 'autoprefixer', 'csscomb', 'csslint']
  grunt.registerTask 'script', ['concat']
  grunt.registerTask 'develop', ['connect:app', 'watch']
  grunt.registerTask 'typeset', ['webfont', 'stylesheet']
  grunt.registerTask 'publish', ['stylesheet', 'kss','connect:doc', 'watch:doc']
  grunt.registerTask 'build', ['stylesheet', 'csso', 'image']
