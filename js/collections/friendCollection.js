/*global define: false */
/*jslint nomen: true */

define(['jquery',
        'underscore',
        'backbone',
        'models/friendModel'], function ($, _, Backbone, FriendModel) {
    "use strict";
    var FriendCollection = Backbone.Collection.extend({
        model: FriendModel,

        url: "https://graph.facebook.com/me/friends?" + "access_token=AAAAAAITEghMBAAZBPGqRVKp0Uy3VE9TxZCPZBU3EdHVIRLombWKJp3JnR5TwJdamSZANeJaqckLdSpnZCXlPnKZBiptJDPjZB9XYMxNk5TIwAZDZD",

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
