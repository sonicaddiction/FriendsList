/*global define: false */
/*jslint nomen: true */

define(['jquery',
        'underscore',
        'backbone',
        'text!templates/friendsList/friendsListItemTemplate.html'],
    function ($, _, Backbone, friendsListItemTemplate) {
        "use strict";
        var AppView = Backbone.View.extend({
            tagName: 'li',

            initialize: function () {
            },

            render: function () {
                $(this.el).html(friendsListItemTemplate).addClass("span6");
                return this;
            }
        });
        return AppView;
    });