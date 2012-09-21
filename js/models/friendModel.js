/*global define: false */
/*jslint nomen: true */

define(['underscore',
        'backbone'], function (_, Backbone) {
    "use strict";
    var FriendModel = Backbone.Model.extend({
        default: {
            name: 'Name',
            id: '1000000'
        }
    });
    return FriendModel;
});