/**
 * Created by NumanElahi on 1/15/2017.
 */

(function () {
    'use strict';
    angular.module('lib.services', [])
        /**
         * Service for creating and ending user sessions.
         */
        .service('authService', ['$http', '$cookieStore', '$q', function ($http, $cookieStore, $q) {
            /**
             * Login method
             * @param username
             * @param password
             * @returns {*|Promise}
             */
            this.login = function (username, password) {
                var _this = this;
                return $http.post('/login', {username: username, password: password})
                    .then(function(response){
                        if (response.data)
                        {
                            _this.user = response.data;
                            $cookieStore.put('user', _this.user);
                            return _this.user;
                        }
                        return $q.reject({data: 'error'});
                    })
                    ;
            };

            /**
             * Logout method
             * @returns {*|Promise}
             */
            this.logout = function () {
                var _this = this;
                return $http.get('/logout')
                    .then(function (response) {
                        _this.user = undefined;
                        $cookieStore.remove('user');
                        return response;
                    })
                    ;
            };
        }])
        /**
         * Service for adding resources
         */
        .service('addResource', ['$http', '$q', function ($http, $q) {
            var add = function (url, data) {
                return $http.post(url, data);
            }

            this.addBook = function (url, book) {
                return add(url, book)
                    .then(function (res) {
                        if(res.data === 'OK'){
                            return 'OK'
                        }
                        return $q.reject();
                    });
            };

            this.addUser = function (url, user) {
                return add(url, user);
            }
        }])
        /**
         * Service for fetching resources
         */
        .service('fetchResources', ['$http', '$q', function ($http, $q) {
            var get = function (url, options) {
                return options ? $http.get(url+'?key='+options) : $http.get(url);
            }

            this.getBooks = function (url, options) {
                return get(url, options)
                    .then(function (res) {
                        return res.data;
                    })
                    .catch(function (err) {
                        $q.reject(err);
                    });
            };

            this.getUsers = function (url) {
                return get(url)
                    .then(function (res) {
                        return res.data;
                    });
            }
        }])
        /**
         * Service for removing resources
         */
        .service('removeResource', ['$http', '$q', function ($http, $q) {
            var remove = function (url, id) {
                return $http.delete(url+ '/' + id);
            }

            this.removeBook = function (url, id) {
                return remove(url, id);
            };

            this.removeUser = function (url, id) {
                return remove(url, id);
            };
        }])
        /**
         * Service for book circulation operations
         */
        .service('circulation', ['$http', '$q', function ($http, $q) {
            this.issue = function (data) {
                return $http.post('/operation/issue', data)
                    .then(function (res) {
                        if(res.data === "OK")
                        {
                            return "OK"
                        }
                        return $q.reject();
                    })
                    .catch(function (err) {
                    });
            };

            this.returnBook = function (bookId, transId) {
                var data = {
                    bookId: bookId,
                    transId: transId
                }
                return $http.post('/operation/return', data)
                    .then(function (res) {
                        return res.data;
                    });
            }
        }])
    ;
})()