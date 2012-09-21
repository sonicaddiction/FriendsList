/*global define: false, require: false */
/*jslint nomen: true */

define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    "use strict";
    var AppRouter = Backbone.Router.extend({
        routes: {
            '*actions': 'defaultAction'
        }
    });

    var initialize = function (options) {
        var mainView = options.mainView,
            router = new AppRouter(options);

        router.on('route:defaultAction', function () {
            console.log("Default action!");
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});