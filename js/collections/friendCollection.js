/*global define: false */
/*jslint nomen: true */

define(['jquery',
        'underscore',
        'backbone',
        'models/friendModel'], function ($, _, Backbone, FriendModel) {
    "use strict";
    var FriendCollection = Backbone.Collection.extend({
        model: FriendModel,

        initialize: function () {
        }
    });
    return FriendCollection;
});
