require.config({
    deps: [
        // Global Plugins & Patches
        "string",
        // Bootloader
        "main"
    ],

    paths: {
        // Core
        'jquery': 'lib/jquery',
        'underscore': 'lib/underscore',
        'json2': 'lib/json2',
        'backbone': 'lib/backbone',
        // Plugins & Patches
        'string': 'lib/objects/string',
        'squire': '../../test/lib/squire'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'backbone': {
            deps: ['jquery', 'underscore', 'json2'],
            exports: 'Backbone'
        },
        'templates': {
            exports: 'JST'
        }
    }
});
