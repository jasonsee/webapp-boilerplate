require([
    'app',
    'backbone',
    'marionette',
    'routers/index',
    'controllers/index',
    'views/main'
], function (
    App,
    Backbone,
    Marionette,
    IndexRouter,
    IndexController,
    MainView
) {
    "use strict";

    var app = new App();

    Marionette.Renderer.render = function (template, data) {
        return template.template(data);
    };

    app.addRegions({main: '#main'});

    app.addInitializer(function () {
        app.main.show(new MainView());
    });

    app.start();

    new IndexRouter({
        controller: new IndexController()
    });

    Backbone.history.start();
});
