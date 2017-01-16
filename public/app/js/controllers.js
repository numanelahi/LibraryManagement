/**
 * Created by NumanElahi on 1/15/2017.
 */

(function () {
    'use strict';
    angular.module('lib.controllers', [])
        /**
         * Controller to manage login related operations
         */
        .controller('loginController',['$scope', 'authService', '$state', function($scope, authService, $state){
            if (authService.user) {
                $state.go('home');
            }

            $scope.loginButton = "Log in";

            $scope.login = function () {
                $scope.loginButton = "Logging in..";
                authService.login(this.username, this.password).then(function(data){
                    if (data) {
                        $state.go('home.books');
                    }
                }).catch(function (err) {
                    alert(err.data);
                }).finally(function(){
                    $scope.loginButton = "Log in";
                    $scope.username = $scope.password = "";
                });
            };
        }])
        /**
         * Controller for home operations
         */
        .controller('homeController', ['$scope', '$state', 'authService', function($scope, $state, authService){
            $scope.logout = function () {
                authService.logout()
                    .then(function (res) {
                        $state.go('login');
                    });
            };
        }])
        /**
         * Controller for user fetch operation
         */
        .controller('usersController', ['$scope', 'fetchResources', function ($scope, fetchResources) {
            fetchResources.getUsers('/users')
                .then(function (data) {
                    $scope.users = data;
                });
        }])
        /**
         * Controller for book related operations
         */
        .controller('booksController', ['$scope', 'fetchResources', 'removeResource',  'circulation', function ($scope, fetchResources, removeResource, circulation) {
            fetchResources.getBooks('/books')
                .then(function (data) {
                    $scope.books = data;
                }).catch(function (err) {
                    console.log(err);
            });
            $scope.removeBook = function (index) {
                removeResource.removeBook('/books', this.book.id)
                    .then(function(data){
                        $scope.books.splice(index, 1);
                    });
            };
            $scope.returnBook = function () {
                var _this = this;
                circulation.returnBook(this.book.id, this.book.last_trans_id)
                    .then(function (data) {
                        _this.book.isAvailable = _this.book.isAvailable ? false : true;
                    });
            };
        }])
        /**
         * Controller for adding new books
         */
        .controller('addBookController', ['$scope', 'addResource', '$state', function ($scope, addResource, $state) {
            $scope.btnVal = "Add";
            $scope.addBook = function () {
                $scope.btnVal = "Adding...";
                addResource.addBook('/books', $scope.book)
                    .then(function (data) {
                        $state.go('home.books');
                    }).catch(function (err) {
                        alert('Error adding book');
                }).finally(function(){
                    $scope.btnVal = "Add";
                    $scope.book = {};
                });
            }
        }])
        /**
         * Controller for issuing books
         */
        .controller('circulationController', ['$scope', 'fetchResources', 'circulation', '$state', function ($scope, fetchResources, circulation, $state) {
            fetchResources.getBooks('/books', true)
                .then(function (data) {
                    $scope.books = data;
                });
            fetchResources.getUsers('/users')
                .then(function (data) {
                    $scope.users = data;
                });

            $scope.issue = function () {
                circulation.issue($scope.circ)
                    .then(function (data) {
                        $state.go('home.books');
                    });
            }
        }])
        .run(['$rootScope', '$state', '$cookieStore', 'authService', function ($rootScope, $state, $cookieStore, authService) {
            $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, error) {
                if(error.unauthorized){
                    $state.go('login');
                }
            });
            authService.user = $cookieStore.get('user');
        }])
    ;
})();
