define([
    'marionette',
    'hbs!templates/main.html'
], function (Marionette, mainTemplate) {
    "use strict";

    return Marionette.ItemView.extend({
        template: {
            type: 'handlebars',
            template: mainTemplate
        }
    });
});
