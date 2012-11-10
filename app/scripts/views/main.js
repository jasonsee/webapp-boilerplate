define([
    'backbone',
    'marionette',
    'templates'
], function (Backbone, Marionette, Templates) {
    "use strict";

    return Marionette.ItemView.extend({
        template: {
            template: Templates['main.hbs']
        },
        model: new Backbone.Model({foo: 'Hello'})
    });
});
