/**
 * Posts
 * @namespace thinkster.posts.services
 */
(function () {
    'use strict';

    angular
        .module('thinkster.posts.services')
        .factory('Posts', Posts);

    Posts.$inject = ['$http'];

    /**
     * @namespace Posts
     * @returns {Factory}
     */
    function Posts($http) {
        var Posts = {
            all: all,
            create: create,
            get: get,
            getUsers: getUsers
        };

        return Posts;

        ////////////////////

        /**
         * @name all
         * @desc Get all Posts
         * @returns {Promise}
         * @memberOf thinkster.posts.services.Posts
         */
        function all() {
            return $http.get('/Geolocalizacion/api/v1/posts/');
        }


        /**
         * @name create
         * @desc Create a new Post
         * @param {string} barcode The barcode of the new Post
         * @returns {Promise}
         * @memberOf thinkster.posts.services.Posts
         */
        function create(barcode, latitud, longitud, timestamp) {
            return $http.post('/Geolocalizacion/api/v1/posts/', {
                barcode: barcode,
                latitud: latitud,
                longitud: longitud,
                timestamp: timestamp
            });
        }
        /**
         * @name getDate
         * @desc Get the Users
         * @param {string} date The date to get Posts for
         * @returns {Promise}
         * @memberOf thinkster.posts.services.Posts
         */
        function getUsers() {
            return $http.post('/Geolocalizacion/api/v1/listUsers/');
        }

        /**
         * @name get
         * @desc Get the Posts of a given user
         * @param {string} username The username to get Posts for
         * @returns {Promise}
         * @memberOf thinkster.posts.services.Posts
         */
        function get(username) {
            return $http.get('/Geolocalizacion/api/v1/accounts/' + username + '/posts/');
        }
    }
})();