/*global define: false */
/*jslint nomen: true */

define(['jquery',
        'underscore',
        'backbone',
        'text!templates/friendsList/friendsListTemplate.html',
        'views/friendsList/friendsListItem',
        'collections/friendCollection'],
    function ($, _, Backbone, friendsListTemplate, FriendsListItem, FriendCollection) {
        "use strict";
        var AppView = Backbone.View.extend({
            tagName: 'div',

            initialize: function () {
                _.bindAll(this, 'render', 'appendListItem');
            },

            render: function () {
                $(this.el).html(friendsListTemplate);

                this.appendListItem("");

                return this;
            },

            appendListItem: function (friendModel) {
                var listItem = new FriendsListItem({
                    model: null
                });
                $(".friendsList", this.el).append(listItem.render().el);
            }
        });
        return AppView;
    });