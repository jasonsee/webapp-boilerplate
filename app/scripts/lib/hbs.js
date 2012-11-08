// hbs.js plugin for requirejs / text.js
// it loads and compiles Handlebars templates
// http://stackoverflow.com/a/11061975
define(['handlebars'], function (Handlebars) {
    "use strict";

    var load = function (resourceName, parentRequire, callback, config) {
        parentRequire([("text!" + resourceName)],
            function (templateContent) {
                var template = Handlebars.compile(templateContent);
                callback(template);
            }
        );
    };

    return {load: load};
});
