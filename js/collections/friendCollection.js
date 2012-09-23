/*global define: false */
/*jslint nomen: true */

define(['jquery',
        'underscore',
        'backbone',
        'models/friendModel'], function ($, _, Backbone, FriendModel) {
    "use strict";
    var FriendCollection = Backbone.Collection.extend({
        model: FriendModel,

        url: "https://graph.facebook.com/me/friends?" + "access_token=AAACEdEose0cBAOhv6COmQ93yTR8WY6xC6YgwDaDYRtjRnbjZAXeFZABxYT4A8UtA8gP3ZBXeg4YFADsU7mTWltcdn4NHQYqP6eyE9xuWgZDZD",

        parse: function (response) {
            return response.data;
        },

        deferred: Function.constructor.prototype,

        initialize: function () {
            this.deferred = new $.Deferred();

            this.fetch({
                success: this.fetchSuccessCallback,
                error: this.fetchErrorCallback 
            });
        },

        fetchSuccessCallback: function (collection, response) {
            collection.deferred.resolve(collection);
        },

        fetchErrorCallback: function (collection, response) {
            throw new Error("Error while fetching friend list");
        }
    });
    return FriendCollection;
});
