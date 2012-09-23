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

            events: {
                'click #facebookLogin': 'facebookLogin'
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
            },

            facebookLogin: function () {
                window.open("https://www.facebook.com/dialog/oauth?client_id=501462183199289&redirect_uri=http://localhost/~kristofer/FriendsList&response_type=token");
            }
        });
        return AppView;
    });