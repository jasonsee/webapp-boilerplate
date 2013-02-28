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
        connect: {
            dev: {
                options: {
                    port: 8000,
                    base: './app'
                }
            },
            release: {
                options: {
                    port: 8000,
                    base: './dist/release',
                    keepalive: true
                }
            },
            docs: {
                options: {
                    port: 8001,
                    base: './docs',
                    keepalive: true
                }
            },
            test: {
                options: {
                    port: 8002,
                    base: '.'
                }
            },
            specrunner: {
                options: {
                    port: 8003,
                    base: '.',
                    keepalive: true
                }
            }
        },
        watch: {
            sass: {
                files: [
                    'app/styles/**/*.scss'
                ],
                tasks: ['compass:dev'],
                options: {
                    forceWatchMethod: 'old'
                }
            },
            js: {
                files: '<%= jshint.all %>',
                tasks: ['jshint'],
                options: {
                    forceWatchMethod: 'old'
                }
            },
            handlebars: {
                files: [
                    'app/scripts/templates/helpers.js',
                    'app/scripts/templates/**/*.hbs'
                ],
                tasks: ['templates'],
                options: {
                    forceWatchMethod: 'old'
                }
            }
        },
        clean: {
            dev: [
                "app/index.html",
                "app/styles/css",
                "app/scripts/templates.js",
                "app/images/gen"
            ],
            test: ["_SpecRunner.html"],
            dist: ["dist"],
            docs: ["docs"]
        },
        jshint: {
            options: {
                bitwise: true,
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    // requirejs
                    "define": false,
                    "require": false,
                    // handlebars, for helpers file
                    "Handlebars": false,
                    // jasmine
                    "beforeEach": false,
                    "describe": false,
                    "xdescribe": false,
                    "expect": false,
                    "it": false,
                    "xit": false,
                    "jasmine": false,
                    "runs": false,
                    "spyOn": false,
                    "waits": false,
                    "waitsFor": false
                }
            },
            all: [
                'Gruntfile.js',
                'app/scripts/**/*.js',
                '!app/scripts/lib/**/*.js',
                '!app/scripts/templates.js',
                'test/spec/**/*.js'
            ]
        },
        jasmine: {
            custom: {
                src: ['app/scripts/main.js'],
                options: {
                    specs: ['test/spec/**/*.js'],
                    host: 'http://127.0.0.1:<%= connect.test.options.port %>/',
                    template: 'test/runner.tmpl',
                    templateOptions: {
                        baseUrl: '<%= requirejs.compile.options.baseUrl %>',
                        config: '<%= requirejs.compile.options.mainConfigFile %>',
                        requirejs: 'app/scripts/lib/require.js'
                    }
                }
            }
        },
        requirejs: {
            compile: {
                options: {
                    name: 'config',
                    baseUrl: './app/scripts/',
                    mainConfigFile: 'app/scripts/config.js',
                    out: 'dist/build/app.js',
                    optimize: 'none'
                }
            }
        },
        compass: {
            dist: {
                // Merged with defaults from config.rb. Overrides here win out.
                options: {
                    cssDir: 'dist/build/css'
                }
            },
            dev: {
                // Use defaults from config.rb.
            }
        },
        replace: {
            options: {
                version: (
                    '<%= pkg.title || pkg.name %> - v<%= pkg.version %> ' +
                    '(Built <%= grunt.template.today() %>)'
                )
            },
            dev: {
                options: {
                    variables: {
                        'script': 'scripts/lib/require.js',
                        'version': '<%= replace.options.version %>'
                    }
                },
                files: {
                    'app/index.html': [
                        'html/index.html'
                    ]
                }
            },
            dist: {
                options: {
                    variables: {
                        'script': (
                            'scripts/app.js?rel=' +
                            '<%= new Date().getTime() %>'
                        ),
                        'version': '<%= replace.options.version %>'
                    }
                },
                files: {
                    'dist/build/index.html': [
                        'html/index.html'
                    ]
                }
            }
        },
        handlebars: {
            compile: {
                options: {
                    processName: function (filename) {
                        return filename.replace('app/scripts/templates/', '');
                    }
                },
                files: {
                    'app/scripts/templates.js': 'app/scripts/templates/**/*.hbs'
                }
            }
        },
        concat: {
            options: {
                banner: '<%= banner %>',
                stripBanners: true
            },
            handlebars: {
                src: [
                    'app/scripts/lib/handlebars.runtime.js',
                    'app/scripts/templates/helpers.js',
                    'app/scripts/templates.js'
                ],
                dest: 'app/scripts/templates.js'
            },
            js: {
                src: [
                    'app/scripts/lib/almond.js',
                    'dist/build/app.js'
                ],
                dest: 'dist/release/scripts/app.js'
            }
        },
        cssmin: {
            dist: {
                files: {
                    'dist/release/styles/css/screen.css': [
                        'dist/build/css/screen.css'
                    ],
                    'dist/release/styles/css/print.css': [
                        'dist/build/css/print.css'
                    ],
                    'dist/release/styles/css/ie.css': [
                        'dist/build/css/ie.css'
                    ]
                }
            }
        },
        uglify: {
            options: {
                banner: '<%= banner %>'
            },
            dist: {
                src: '<%= concat.js.dest %>',
                dest: '<%= concat.js.dest %>'
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeRedundantAttributes: true
                },
                files: {
                    'dist/release/index.html': 'dist/build/index.html'
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: 'app/images',
                        src: ['**'],
                        dest: 'dist/release/images/'
                    },
                    {
                        src: 'app/favicon.ico',
                        dest: 'dist/release/favicon.ico'
                    },
                    {
                        src: 'app/scripts/lib/modernizr.js',
                        dest: 'dist/release/scripts/lib/modernizr.js'
                    }
                ]
            }
        },
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                version: '<%= pkg.version %>',
                options: {
                    paths: ['app/scripts/'],
                    outdir: 'docs/'
                }
            }
        }
    });

    // Load npm tasks.
    grunt.util._.each([
        'contrib-clean',
        'contrib-compass',
        'contrib-concat',
        'contrib-connect',
        'contrib-copy',
        'contrib-handlebars',
        'contrib-htmlmin',
        'contrib-jasmine',
        'contrib-jshint',
        'contrib-cssmin',
        'contrib-requirejs',
        'contrib-uglify',
        'contrib-yuidoc',
        'contrib-watch',
        'replace'
    ], function (tasks) {
        grunt.loadNpmTasks('grunt-' + tasks);
    });

    // Register local tasks.
    grunt.registerTask('templates', [
        'handlebars:compile',
        'concat:handlebars'
    ]);

    grunt.registerTask('test', ['connect:test', 'templates', 'jasmine']);

    grunt.registerTask('test:debug', [
        'templates',
        'jasmine:custom:build',
        'connect:specrunner'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'jshint',
        'test',
        'compass:dist',
        'replace:dist',
        'requirejs'
    ]);

    grunt.registerTask('release', [
        'build',
        'concat',
        'cssmin',
        'uglify',
        'htmlmin',
        'copy'
    ]);

    grunt.registerTask('serve', [
        'templates',
        'compass:dev',
        'replace:dev',
        'connect:dev',
        'watch'
    ]);

    grunt.registerTask('serve:release', [
        'release',
        'connect:release'
    ]);

    grunt.registerTask('serve:docs', [
        'clean:docs',
        'yuidoc',
        'connect:docs'
    ]);

};
