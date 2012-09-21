/*global define: false */
/*jslint nomen: true */

define(['jquery',
        'underscore',
        'backbone',
        'text!templates/friendsList/friendsListTemplate.html'],
    function ($, _, Backbone, friendsListTemplate) {
        "use strict";
        var AppView = Backbone.View.extend({
            tagName: 'div',

            initialize: function () {
            },

            render: function () {
                $(this.el).html(friendsListTemplate);
                return this;
            }
        });
        return AppView;
    });