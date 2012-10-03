/*global define: false, window: false */
/*jslint nomen: true */

define(['jquery',
        'underscore',
        'backbone',
        'views/friendsList/friendsListItem'], function ($, _, Backbone, FriendsListItem) {
    "use strict";

    var Paginator = {
        options: {
            itemsPerPage: 10,
            array: null,
            el: null
        },

        init: function (options) {
            _.extend(this.options, options);
            this.currentItems = options.array.length;
            this.pages = Math.ceil(this.currentItems /  this.options.itemsPerPage);
        },

        renderPage: function (page) {
            var i,
                start = page * this.options.itemsPerPage,
                end = Math.min((page + 1) * this.options.itemsPerPage, this.currentItems);

            for (i = start; i < end; ++i) {
                this.appendListItem(this.options.array[i], this.options.el);
            }
        },

        appendListItem: function (model, element) {
            var listItem = new FriendsListItem({
                model: model
            });
            element.append(listItem.render().el);
        }

    };

    return Paginator;
});
