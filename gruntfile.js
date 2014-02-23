'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    meta: {
      banner: '/**\n' +
      ' * <%= pkg.description %>\n' +
      ' * @version v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
      ' * @link <%= pkg.homepage %>\n' +
      ' * @author <%= pkg.author %>\n' +
      ' * @license MIT License, http://www.opensource.org/licenses/MIT\n' +
      ' */\n'
    },
    connect: {
      devserver: {
        options: {
          port: 9999,
          hostname: '0.0.0.0',
          base: '.',
          keepalive: true
        }
      }
    },
    dirs: {
      dest: 'dist'
    },
    concat: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['src/*.js'],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= meta.banner %>'
      },
      dist: {
        src: ['<%= concat.dist.dest %>'],
        dest: '<%= dirs.dest %>/<%= pkg.name %>.min.js'
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/*.js', 'test/unit/*.js'],
      options: {
        curly: false,
        browser: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        expr: true,
        node: true,
        globals: {
          exports: true,
          angular: false,
          $: false
        }
      }
    },
    // watch: {
    //   files: '<config:jshint.files>',
    //   tasks: 'default'
    // },
    karma: {
      test: {
        options: {
          reporters: ['dots'],
          singleRun: true
        }
      },
      server: {
        options: {
          singleRun: false
        }
      },
      options: {
        configFile: 'test/karma.conf.js'
      }
    },
    bump: {
      options: {
        files: ['package.json', 'bower.json'],
        updateConfigs: ['pkg'],
        commit: true,
        commitMessage: 'release v%VERSION%',
        commitFiles: ['package.json', 'bower.json', 'dist/*'], // '-a' for all files
        tagName: 'v%VERSION%',
        tagMessage: 'version %VERSION%',
        push: false
      }
    }
  });

  // Load grunt versioning
  grunt.loadNpmTasks('grunt-bump');

  // Load the plugin that provides the "jshint" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');

  // Load the plugin that provides the "concat" task.
  grunt.loadNpmTasks('grunt-contrib-concat');

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-uglify');

  grunt.loadNpmTasks('grunt-contrib-connect');

  // Load the plugin that provides the "watch" task.
  //grunt.loadNpmTasks('grunt-contrib-watch');


  // Default task.
  grunt.registerTask('default', ['test']);

  // Test tasks.
  grunt.registerTask('test', ['jshint', 'karma:test']);
  grunt.registerTask('test-server', ['karma:server']);

  // Build task.
  grunt.registerTask('build', ['test', 'concat', 'uglify']);

  // run devserver
  grunt.registerTask('webserver', ['connect:devserver']);

  // Provides the "karma" task.
  grunt.registerMultiTask('karma', 'Starts up a karma server.', function() {
    var done = this.async();
    require('karma').server.start(this.options(), function(code) {
      done(code === 0);
    });
  });

  // bump tasks
  grunt.registerTask('version-patch', ['build', 'bump:patch']);
  grunt.registerTask('version-minor', ['build', 'bump:minor']);
  grunt.registerTask('version-major', ['build', 'bump:major']);
  grunt.registerTask('version-build', ['build', 'bump:build']);
  grunt.registerTask('version-git'  , ['build', 'bump:git']);

};