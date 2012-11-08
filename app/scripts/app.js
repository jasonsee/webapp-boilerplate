define([
    'marionette',
    'views/main'
], function (Marionette, MainView) {
    "use strict";

    var app = new Marionette.Application();

    app.addRegions({main: '#main'});
    app.addInitializer(function () {
        app.main.show(new MainView());
    });

    return app;
});
