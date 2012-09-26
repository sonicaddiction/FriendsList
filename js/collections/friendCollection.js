/*global define: false, window: false */
/*jslint nomen: true */

define(['jquery',
        'underscore',
        'backbone',
        'models/friendModel'], function ($, _, Backbone, FriendModel) {
    "use strict";
    var FriendCollection = Backbone.Collection.extend({
        model: FriendModel,

        url: function () {
            var hash = window.location.hash;
            if (hash.length > 0 && hash.indexOf("access_token") === 1) {
                return "https://graph.facebook.com/me/friends?" + window.location.hash.substr(1);
            } else {
                throw new Error("No access token found in uri hash.");
            }
        },

        parse: function (response) {
            return response.data;
        },

        deferred: Function.constructor.prototype,

        initialize: function (modelArray) {
            this.deferred = new $.Deferred();

            if (typeof modelArray === "undefined") {
                this.fetch({
                    success: this.fetchSuccessCallback,
                    error: this.fetchErrorCallback
                });
            }
        },

        fetchSuccessCallback: function (collection, response) {
            collection.deferred.resolve(collection);
        },

        fetchErrorCallback: function (collection, response) {
            collection.deferred.reject(response);
        },

        comparator: function (friend) {
            return friend.get('name');
        },

        search: function (searchString) {
            var processString = function (string) {
                return $.trim(string).toLowerCase();
            };

            return this.filter(function (friend) {
                var processedSearchString = processString(searchString),
                    processedName = processString(friend.get("name"));

                return processedName.indexOf(processedSearchString) !== -1;
            });
        }
    });

    return FriendCollection;
});
