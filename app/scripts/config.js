require.config({
    deps: ["main"],

    paths: {
        'jquery': 'lib/jquery',
        'underscore': 'lib/underscore',
        'json2': 'lib/json2',
        'backbone': 'lib/backbone',
        'marionette': 'lib/backbone.marionette'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone'
        },
        'marionette': {
            deps: ['backbone'],
            exports: 'Backbone.Marionette'
        },
        'templates': {
            exports: 'JST'
        }
    }
});
