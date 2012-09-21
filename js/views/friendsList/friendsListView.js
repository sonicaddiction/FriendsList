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

                this.friendCollection = new FriendCollection();
            },

            render: function () {
                var that = this;
                $(this.el).html(friendsListTemplate);

                this.friendCollection.deferred.done(function (collection) {
                    collection.each(function (friendModel) {
                        that.appendListItem(friendModel);
                    })
                });

                return this;
            },

            appendListItem: function (friendModel) {
                var listItem = new FriendsListItem({
                    model: friendModel
                });
                $(".friendsList", this.el).append(listItem.render().el);
            }
        });
        return AppView;
    });