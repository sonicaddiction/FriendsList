/*global define: false, window: false */
/*jslint nomen: true */

define(['jquery',
        'underscore',
        'backbone',
        'views/friendsList/friendsListItem'], function ($, _, Backbone, FriendsListItem) {
    "use strict";

    var Paginator = {
        render: function (collection, element) {
            var that = this;

            _.each(collection, function (friendModel) {
                that.appendListItem(friendModel, element);
            });
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
