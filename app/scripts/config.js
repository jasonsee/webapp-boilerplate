require.config({
    deps: [
        "main",
        "lib/backbone.marionette.handlebars"
    ],

    paths: {
        jquery: 'lib/jquery',
        underscore: 'lib/underscore',
        json2: 'lib/json2',
        backbone: 'lib/backbone',
        marionette: 'lib/backbone.marionette',
        handlebars: 'lib/handlebars',
        text: 'lib/text',
        hbs: 'lib/hbs'
    },

    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone'
        },
        marionette: {
            deps: ['backbone'],
            exports: 'Backbone.Marionette'
        }/*,
        hbs: {
            deps: ['text', 'handlebars'],
            exports: 'hbs'
        }*/
    }
});
