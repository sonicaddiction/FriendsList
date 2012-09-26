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
                _.bindAll(this, 'render', 'appendListItem', 'displayError', 'renderFiltered', 'performSearch');

                this.friendCollection = new FriendCollection();

            },

            events: {
                'keyup #searchInput': 'performSearch'
            },

            render: function () {
                var that = this;

                $(that.el).html(friendsListTemplate);

                this.performSearch();

                this.friendCollection.deferred.fail(function (response) {
                    var responseJSON = $.parseJSON(response.responseText);
                    that.displayError(responseJSON.error.message);
                });

                return this;
            },

            renderFiltered: function (searchString, collection) {
                var that = this,
                    searchArray = collection.search(searchString);

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

            performSearch: function () {
                var that = this;

                this.friendCollection.deferred.done(function (collection) {
                    var searchString = $("#searchInput").val();

                    $("#searchInput").removeAttr("disabled");
                    $(".friendsList", that.el).empty();

                    that.renderFiltered(searchString, collection);
                });
            }

        });
        return AppView;
    });