/*global define: false, require: false, window: false */
/*jslint nomen: true, vars: true */

define(['jquery', 'underscore', 'backbone'], function ($, _, Backbone) {
    "use strict";
    var AppRouter = Backbone.Router.extend({
        routes: {
            '*actions': 'defaultAction'
        }
    });

    var initialize = function (options) {
        var mainView = options.mainView,
            router = new AppRouter(options);

        router.on('route:defaultAction', function () {
            var hash = window.location.hash,
                facebookAuthenticationUrl = "https://www.facebook.com/dialog/oauth?client_id=501462183199289&redirect_uri=http://localhost/~kristofer/FriendsList&response_type=token";

            if (hash.length > 0 && hash.indexOf("access_token=") === 1) {
                require(['views/friendsList/friendsListView'], function (FriendsListView) {
                    var accessToken = hash.substr(1),
                        friendsListView = new FriendsListView();
                    $(".pageContent").html(friendsListView.render().el);
                });
            } else {
                window.location.replace(facebookAuthenticationUrl);
            }
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});