/*global define: false */
/*jslint nomen: true */

define(['jquery',
        'underscore',
        'backbone',
        'text!templates/layout.html'], function ($, _, Backbone, layoutTemplate) {
    "use strict";
    var AppView = Backbone.View.extend({
        el: 'body',

        initialize: function () {
        },

        render: function () {
            $(this.el).html(layoutTemplate);
        }
    });
    return AppView;
});