require([
    'app',
    'backbone',
    'marionette',
    'routers/index',
    'controllers/index'
], function (app, Backbone, Marionette, IndexRouter, IndexController) {
    "use strict";

    Marionette.Renderer.render = function (template, data) {
        return template.template(data);
    };

    app.start();
    new IndexRouter({
        controller: new IndexController()
    });
    Backbone.history.start();
});
