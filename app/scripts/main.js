require([
    'app',
    'backbone',
    'routers/index',
    'controllers/index'
], function (app, Backbone, IndexRouter, IndexController) {
    "use strict";

    app.start();
    new IndexRouter({
        controller: new IndexController()
    });
    Backbone.history.start();
});
