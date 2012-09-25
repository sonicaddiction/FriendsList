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
                _.bindAll(this, 'render', 'appendListItem', 'displayError');

                this.friendCollection = new FriendCollection();
            },

            render: function () {
                var that = this;

                $(that.el).html(friendsListTemplate);

                this.friendCollection.deferred.done(function (collection) {
                    collection.each(function (friendModel) {
                        that.appendListItem(friendModel);
                    });
                });
                this.friendCollection.deferred.fail(function (response) {
                    var responseJSON = $.parseJSON(response.responseText);
                    that.displayError(responseJSON.error.message);
                });

                return this;
            },

            appendListItem: function (friendModel) {
                var listItem = new FriendsListItem({
                    model: friendModel
                });
                $(".friendsList", this.el).append(listItem.render().el);
            },

            displayError: function (message) {
                var errorMessage = [];
                errorMessage.push('<div class="alert alert-error">');
                errorMessage.push(message);
                errorMessage.push('</div>');
                $(this.el).html(errorMessage.join(""));
            }

        });
        return AppView;
    });