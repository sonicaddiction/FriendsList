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
                _.bindAll(this, 'render', 'appendListItem', 'displayError', 'renderFiltered', 'newSearch');

                this.friendCollection = new FriendCollection();

            },

            events: {
                'keyup #searchInput': 'newSearch'
            },

            render: function () {
                var that = this;

                $(that.el).html(friendsListTemplate);

                this.friendCollection.deferred.done(function (collection) {
                    that.renderFiltered("", collection);
                    $("#searchInput").removeAttr("disabled");
                });
                
                this.friendCollection.deferred.fail(function (response) {
                    var responseJSON = $.parseJSON(response.responseText);
                    that.displayError(responseJSON.error.message);
                });

                return this;
            },

            renderFiltered: function (searchString, collection) {
                var that = this,
                    searchArray = collection.search(searchString);

                $(".friendsList", this.el).empty();
                _.each(searchArray, function (friendModel) {
                    that.appendListItem(friendModel);
                });
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
            },

            newSearch: function (event) {
                var that = this;
                this.friendCollection.deferred.done(function (collection) {
                    var searchString = $(event.target).val();
                    that.renderFiltered(searchString, collection);
                });
            }

        });
        return AppView;
    });