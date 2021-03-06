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

            currentPage: 0,

            initialize: function () {
                _.bindAll(this, 'render', 'displayError', 'renderFiltered', 'performSearchAndRender');

                this.friendCollection = new FriendCollection();
            },

            events: {
                'keyup #searchInput': 'performSearchAndRender',
                'click #nextPage': 'renderNextPage',
                'click #prevPage': 'renderPrevPage'
            },

            render: function () {
                var that = this;

                $(that.el).html(friendsListTemplate);

                this.performSearchAndRender();

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

                Paginator.init({
                    array: searchArray,
                    el: listElement,
                    currentPage: 0
                });

                
                Paginator.renderPage(0);
            },

            displayError: function (message) {
                var errorMessage = [];
                errorMessage.push('<div class="alert alert-error">');
                errorMessage.push(message);
                errorMessage.push('</div>');
                $(this.el).html(errorMessage.join(""));
            },

            performSearchAndRender: function () {
                var that = this;

                this.friendCollection.deferred.done(function (collection) {
                    var searchString = $("#searchInput").val();

                    $("#searchInput").removeAttr("disabled");
                    $(".friendsList", that.el).empty();

                    that.renderFiltered(searchString, collection);
                });
            },

            renderNextPage: function (event) {
                event.preventDefault();
                Paginator.renderNextPage();
            },

            renderPrevPage: function (event) {
                event.preventDefault();
                Paginator.renderPrevPage();
            }


        });
        return AppView;
    });