/*global define: false */
/*jslint nomen: true */

define(['jquery',
        'underscore',
        'backbone',
        'text!templates/friendsList/friendsListTemplate.html',
        'views/friendsList/friendsListItem',
        'collections/friendCollection',
        'helpers/paginator'],
    function ($, _, Backbone, friendsListTemplate, FriendsListItem, FriendCollection, Paginator) {
        "use strict";
        var AppView = Backbone.View.extend({
            tagName: 'div',

            initialize: function () {
                _.bindAll(this, 'render', 'displayError', 'renderFiltered', 'performSearch');

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
                    searchArray = collection.search(searchString),
                    listElement = $(".friendsList", this.el);

                Paginator.render(searchArray, listElement);
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