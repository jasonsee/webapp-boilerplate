/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        // Metadata.
        pkg: grunt.file.readJSON('package.json'),
        banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
        '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
        '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
        '* Copyright (c) <%= grunt.template.today("yyyy") %> ' +
        '<%= pkg.author.name %>;' +
        ' Licensed <%= _.pluck(pkg.licenses, "type").join(", ") %> */\n',
        // Task configuration.
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            dist: {
                src: ['app/<%= pkg.name %>.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.dist.dest %>',
                dest: 'dist/<%= pkg.name %>.min.js'
            }
        },
        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                unused: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {}
            },
            all: [
                'Gruntfile.js',
                'app/**/*.js',
                'test/**/*.js'
            ]
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {}
    });

    // Load contrib tasks.
    grunt.util._.each([
        'clean',
        'concat',
        'handlebars',
        'jshint',
        'mincss',
        'qunit',
        'requirejs',
        'sass',
        'uglify',
        'watch'
    ], function (contrib) {
        grunt.loadNpmTasks('grunt-contrib-' + contrib);
    });

    // Default task.
    grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

};
