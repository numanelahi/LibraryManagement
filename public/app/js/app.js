/**
 * Created by NumanElahi on 1/15/2017.
 */

(function () {
    'use strict';
    angular.module('lib', [
        'lib.controllers',
        'ui.router',
        'lib.services',
        'ngCookies'
    ]);
    angular.module('lib')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
                    $stateProvider.state('home',{
                        url: '/home',
                        controller: 'homeController',
                        resolve: {
                            user : ['authService', '$q', function (authService, $q) {
                                return (authService.user || $q.reject({unauthorized: true}));
                            }]
                        },
                        templateUrl: '/static/app/html/home.html'
                    }).state('login',{
                        url: '/login',
                        controller: 'loginController',
                        templateUrl: '/static/app/html/login.html'
                    }).state('home.users',{
                        url: '/users',
                        controller: 'usersController',
                        templateUrl: '/static/app/html/users.html'
                    }).state('home.books', {
                        url: '/books',
                        controller: 'booksController',
                        templateUrl: '/static/app/html/books.html'
                    }).state('home.addBook', {
                        url: '/addbook',
                        controller: 'addBookController',
                        templateUrl: '/static/app/html/addBook.html'
                    }).state('home.circulation', {
                        url: '/circulate',
                        controller: 'circulationController',
                        templateUrl: '/static/app/html/circulation.html'
                    })
                    ;
                    $urlRouterProvider.otherwise('/home/books');
        }])
    ;
 })();
