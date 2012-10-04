/*global define: false, window: false */
/*jslint nomen: true */

define(['jquery',
        'underscore',
        'backbone',
        'views/friendsList/friendsListItem'], function ($, _, Backbone, FriendsListItem) {
    "use strict";

    var Paginator = {
        options: {
            itemsPerPage: 8,
            array: null,
            el: null,
            currentPage: 0
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

            this.options.el.empty();

            for (i = start; i < end; ++i) {
                this._appendListItem(this.options.array[i], this.options.el);
            }

            this._redrawPageDisplay();
        },

        _redrawPageDisplay: function () {
            var label = (this.options.currentPage + 1) + " / " + this.pages;
            $(".currentPage").html(label);

        },

        _appendListItem: function (model, element) {
            var listItem = new FriendsListItem({
                model: model
            });
            element.append(listItem.render().el);
        },

        renderNextPage: function () {
            if (this.options.currentPage < this.pages - 1) {
                this.options.currentPage++;
                this.renderPage(this.options.currentPage);
            }
        },

        renderPrevPage: function () {
            if (this.options.currentPage > 0) {
                this.options.currentPage--;
                this.renderPage(this.options.currentPage);
            }
        }
    };

    return Paginator;
});
