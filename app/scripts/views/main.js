define([
    'backbone',
    'marionette',
    'handlebars',
    'templates/compiled/main'
], function (Backbone, Marionette, Handlebars, MainTemplate) {
    "use strict";

    return Marionette.ItemView.extend({
        template: MainTemplate,
        model: new Backbone.Model({foo: 'Hello'})
    });
});
