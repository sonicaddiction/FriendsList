/*global define: false, require: false, window: false */
/*jslint nomen: true */

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
                        friendsListView = new FriendsListView({
                            accessToken: accessToken
                        });
                    $(".pageContent").html(friendsListView.render().el);
                });
            } else {
                window.location.replace(facebookAuthenticationUrl);
            }
        });

        router.on('route:friendsList', function () {
            require(['views/friendsList/friendsListView'], function (FriendsListView) {
                var friendsListView = new FriendsListView();
                $(".pageContent").html(friendsListView.render().el);
            });
        });

        router.on('route:authentication', function () {
            console.log(window);
        });

        Backbone.history.start();
    };

    return {
        initialize: initialize
    };
});