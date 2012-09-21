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
                var compiledTemplate = _.template(friendsListItemTemplate, this.options.model.toJSON());
                $(this.el).html(compiledTemplate).addClass("span6");
                return this;
            }
        });
        return AppView;
    });