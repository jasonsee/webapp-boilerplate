define([
    'backbone',
    'backbone.wreqr'
], function (Backbone) {
    "use strict";

    return new Backbone.Wreqr.EventAggregator();
});
