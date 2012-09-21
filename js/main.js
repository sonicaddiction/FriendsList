/*global require: false */
/*jslint nomen: true */

require.config({
    paths: {
        'jquery': 'libs/jquery/jquery-1.8.0.min',
        'underscore': 'libs/underscore/underscore-min',
        'backbone': 'libs/backbone/backbone-min',
        'bootstrap': 'libs/bootstrap/bootstrap',
        'text': 'libs/require/text',
        'templates': '../templates'
    }
});

require(['jquery', 'views/mainView', 'router'], function ($, MainView, Router) {
    "use strict";
    var mainView = new MainView();
    mainView.render();

    Router.initialize({
        mainView: mainView
    });
});