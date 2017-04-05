(function () {
    'use strict';

    var app = angular
        .module('thinkster', [
            'thinkster.config',
            'thinkster.routes',
            'thinkster.authentication',
            'thinkster.layout',
            'thinkster.posts',
            'thinkster.utils',
            'ui.select',
            'ngSanitize'
        ]);

    angular
        .module('thinkster.routes', ['ngRoute']);
    angular
        .module('thinkster.config', []);

    angular
        .module('thinkster')
        .run(run);

    run.$inject = ['$http'];

    /**
     * @name run
     * @desc Update xsrf $http headers to align with Django's defaults
     */
    function run($http) {
        $http.defaults.xsrfHeaderName = 'X-CSRFToken';
        $http.defaults.xsrfCookieName = 'csrftoken';
    }


})();

(function () {
    'use strict';

    angular
        .module('thinkster.config')
        .config(config);

    config.$inject = ['$locationProvider'];

    /**
     * @name config
     * @desc Enable HTML5 routing
     */
    function config($locationProvider) {
        $locationProvider.html5Mode(true);
        $locationProvider.hashPrefix('!');
    }
})();


(function () {
    'use strict';

    angular
        .module('thinkster.routes')
        .config(config);

    config.$inject = ['$routeProvider'];

    /**
     * @name config
     * @desc Define valid application routes
     */
    function config($routeProvider) {
        $routeProvider.when('/register', {
            controller: 'RegisterController',
            controllerAs: 'vm',
            template: "<div class='row'> <div class='col-md-4 col-md-offset-4'> <h1>Registrar</h1> <div class='well'> <form role='form' ng-submit='vm.register()'> <div class='form-group'> <label for='register__first_name'>Nombre</label> <input type='text' class='form-control' id='register__first_name' ng-model='vm.first_name' placeholder='ej. Pepito' required/> </div><div class='form-group'> <label for='register__last_name'>Apellido</label> <input type='text' class='form-control' id='register__last_name' ng-model='vm.last_name' placeholder='ej. Perez' required/> </div><div class='form-group'> <label for='register__username'>Nombre de Usuario</label> <input type='text' class='form-control' id='register__username' ng-model='vm.username' placeholder='ej. peperez' required/> </div><div class='form-group'> <label for='register__password'>Contraseña</label> <input type='password' class='form-control' id='register__password' ng-model='vm.password' placeholder='ej. estanoesunacontraseña' required/> </div><div class='form-group'> <button type='submit' class='btn btn-primary'>Registrar</button> </div></form> </div></div></div>"
        }).when('/Geolocalizacion/login', {
            controller: 'LoginController',
            controllerAs: 'vm',
            template: "<div class='row'> <div class='col-md-4 col-md-offset-4'> <h1>Login</h1> <div class='well'> <form role='form' ng-submit='vm.login()'> <div class='alert alert-danger' ng-show='error' ng-bind='error'></div><div class='form-group'> <label for='login__username'>Usuario</label> <input type='text' class='form-control' id='login__username' ng-model='vm.username' placeholder='ej. admin' required/> </div><div class='form-group'> <label for='login__password'>Contraseña</label> <input type='password' class='form-control' id='login__password' ng-model='vm.password' placeholder='ej. estanoesunacontraseña' required/> </div><div class='form-group'> <button type='submit' class='btn btn-primary'>Login</button> </div></form> </div></div></div>"
        }).when('/informacion', {
            controller: 'IndexController',
            controllerAs: 'vm',
            template: "<div style=' margin: auto; width: 50%; height: 70% !important; padding: 10px;'> <label for='usuarios'>Usuarios </label> <ui-select id='usuarios' ng-model='vm.selected.value'> <ui-select-match> <span ng-bind='$select.selected.id+' - '+$select.selected.first_name+' '+$select.selected.last_name+' - '+$select.selected.username'></span> </ui-select-match> <ui-select-choices repeat='item in (itemArray | filter: $select.search) track by item.id'> <span ng-bind='item.id+' - '+item.first_name+' '+item.last_name+' - '+item.username'></span> </ui-select-choices> </ui-select></div>"
        }).otherwise('/');
    }
})();

(function () {
    'use strict';

    angular
        .module('thinkster.authentication', [
      'thinkster.authentication.controllers',
      'thinkster.authentication.services'
    ]);

    angular
        .module('thinkster.authentication.controllers', []);

    angular
        .module('thinkster.authentication.services', ['ngCookies']);
})();

/**
 * LoginController
 * @namespace thinkster.authentication.controllers
 */
(function () {
    'use strict';

    angular
        .module('thinkster.authentication.controllers')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$location', '$scope', 'Authentication'];

    /**
     * @namespace LoginController
     */
    function LoginController($location, $scope, Authentication) {
        var vm = this;

        vm.login = login;

        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf thinkster.authentication.controllers.LoginController
         */
        function activate() {
            // If the user is authenticated, they should not be here.
            if (Authentication.isAuthenticated()) {
                $location.url('/informacion');
            }
        }

        /**
         * @name login
         * @desc Log the user in
         * @memberOf thinkster.authentication.controllers.LoginController
         */
        function login() {
            Authentication.login(vm.username, vm.password);
        }
    }
})();

/**
 * Register controller
 * @namespace thinkster.authentication.controllers
 */
(function () {
    'use strict';

    angular
        .module('thinkster.authentication.controllers')
        .controller('RegisterController', RegisterController);

    RegisterController.$inject = ['$location', '$scope', '$http', 'Authentication'];

    /**
     * @namespace RegisterController
     */
    function RegisterController($location, $scope, $http, Authentication) {
        var vm = this;

        vm.register = register;
        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf thinkster.authentication.controllers.RegisterController
         */
        function activate() {
            // If the user is authenticated, they should not be here.
            if (Authentication.isAuthenticated()) {
                $location.url('/');
            }
        }

        /**
         * @name register
         * @desc Register a new user
         * @memberOf thinkster.authentication.controllers.RegisterController
         */
        function register() {
            Authentication.register(vm.password, vm.username, vm.first_name, vm.last_name);
        }
    }
})();

/**
 * Authentication
 * @namespace thinkster.authentication.services
 */
(function () {
    'use strict';

    angular
        .module('thinkster.authentication.services')
        .factory('Authentication', Authentication);

    Authentication.$inject = ['$cookies', '$http'];

    /**
     * @namespace Authentication
     * @returns {Factory}
     */
    function Authentication($cookies, $http) {
        /**
         * @name Authentication
         * @desc The Factory to be returned
         */
        var Authentication = {
            getAuthenticatedAccount: getAuthenticatedAccount,
            isAuthenticated: isAuthenticated,
            login: login,
            register: register,
            setAuthenticatedAccount: setAuthenticatedAccount,
            unauthenticate: unauthenticate,
            logout: logout
        };

        return Authentication;

        ////////////////////

        /**
         * @name register
         * @desc Try to register a new user
         * @param {string} username The username entered by the user
         * @param {string} password The password entered by the user
         * @param {string} email The email entered by the user
         * @returns {Promise}
         * @memberOf thinkster.authentication.services.Authentication
         */
        function register(password, username, first_name, last_name) {
            return $http.post('/Geolocalizacion/api/v1/accounts/', {
                username: username,
                password: password,
                first_name: first_name,
                last_name: last_name
                    //email: email
            }).then(registerSuccessFn, registerErrorFn);

            /**
             * @name registerSuccessFn
             * @desc Log the new user in
             */
            function registerSuccessFn(data, status, headers, config) {
                Authentication.login(username, password);
            }

            /**
             * @name registerErrorFn
             * @desc Log "Epic failure!" to the console
             */
            function registerErrorFn(data, status, headers, config) {
                console.error('Epic failure!');
            }
        }

        /**
         * @name login
         * @desc Try to log in with email `email` and password `password`
         * @param {string} email The email entered by the user
         * @param {string} password The password entered by the user
         * @returns {Promise}
         * @memberOf thinkster.authentication.services.Authentication
         */
        function login(username, password) {
            return $http.post('/Geolocalizacion/api/v1/auth/login/', {
                username: username,
                password: password
            }).then(loginSuccessFn, loginErrorFn);

            /**
             * @name loginSuccessFn
             * @desc Set the authenticated account and redirect to index
             */
            function loginSuccessFn(data, status, headers, config) {
                Authentication.setAuthenticatedAccount(data.data);

                window.location = '/informacion';
            }

            /**
             * @name loginErrorFn
             * @desc Log "Epic failure!" to the console
             */
            function loginErrorFn(data, status, headers, config, statusText) {
                console.error(data.data.message);
            }
        }

        /**
         * @name getAuthenticatedAccount
         * @desc Return the currently authenticated account
         * @returns {object|undefined} Account if authenticated, else `undefined`
         * @memberOf thinkster.authentication.services.Authentication
         */
        function getAuthenticatedAccount() {
            if (!$cookies.authenticatedAccount) {
                return;
            }

            return JSON.parse($cookies.authenticatedAccount);
        }

        /**
         * @name isAuthenticated
         * @desc Check if the current user is authenticated
         * @returns {boolean} True is user is authenticated, else false.
         * @memberOf thinkster.authentication.services.Authentication
         */
        function isAuthenticated() {
            return !!$cookies.authenticatedAccount;
        }

        /**
         * @name setAuthenticatedAccount
         * @desc Stringify the account object and store it in a cookie
         * @param {Object} user The account object to be stored
         * @returns {undefined}
         * @memberOf thinkster.authentication.services.Authentication
         */
        function setAuthenticatedAccount(account) {
            $cookies.authenticatedAccount = JSON.stringify(account);
        }

        /**
         * @name unauthenticate
         * @desc Delete the cookie where the user object is stored
         * @returns {undefined}
         * @memberOf thinkster.authentication.services.Authentication
         */
        function unauthenticate() {
            delete $cookies.authenticatedAccount;
        }

        /**
         * @name logout
         * @desc Try to log the user out
         * @returns {Promise}
         * @memberOf thinkster.authentication.services.Authentication
         */
        function logout() {
            return $http.post('/Geolocalizacion/api/v1/auth/logout/')
                .then(logoutSuccessFn, logoutErrorFn);

            /**
             * @name logoutSuccessFn
             * @desc Unauthenticate and redirect to index with page reload
             */
            function logoutSuccessFn(data, status, headers, config) {
                Authentication.unauthenticate();

                window.location = '/';
            }

            /**
             * @name logoutErrorFn
             * @desc Log "Epic failure!" to the console
             */
            function logoutErrorFn(data, status, headers, config) {
                console.error('Epic failure!');
            }
        }

    }
})();


(function () {
    'use strict';

    angular
        .module('thinkster.layout', [
      'thinkster.layout.controllers'
    ]);

    angular
        .module('thinkster.layout.controllers', []);
})();


/**
 * IndexController
 * @namespace thinkster.layout.controllers
 */
(function () {
    'use strict';

    angular
        .module('thinkster.layout.controllers')
        .controller('IndexController', IndexController);

    IndexController.$inject = ['$scope', 'Authentication', 'Posts', 'Snackbar'];

    /**
     * @namespace IndexController
     */
    function IndexController($scope, Authentication, Posts, Snackbar) {
        var vm = this;

        vm.isAuthenticated = Authentication.isAuthenticated();
        vm.infowindow = [];
        vm.marker = [];
        activate();

        $scope.$watch('vm.selected.value', function (nuevo, viejo) {
            if (nuevo) {
                console.log(nuevo);
                makeMap(nuevo.username);
            }
        });

        function makeMap(usuario) {
            Posts.get(usuario).then(function (json) {
                console.log(json);
                $scope.map = new google.maps.Map(document.getElementById('map'), {
                    zoom: 12,
                    center: {
                        lat: 7.907500,
                        lng: -72.504722
                    }
                });
                for (var i = 0; i < json.data.length; i++) {
                    var datos = json.data;

                    var pos = {
                        lat: Number(datos[i].latitud),
                        lng: Number(datos[i].longitud)
                    };

                    var contentString = '<div id="content">' +
                        '<div id="siteNotice">' +
                        '</div>' +
                        '<h1 id="firstHeading" class="firstHeading">' + datos[i].author.first_name + ' ' +
                        datos[i].author.last_name + '</h1>' +
                        '<div id="bodyContent">' +
                        '<p><b>Código leído: </b>' + datos[i].barcode + ' </p> <br/>' +
                        '<p><b>Fecha y hora registrada: </b>' + datos[i].updated_at + ' </p> <br/>' +
                        '</div>' +
                        '</div>';

                    console.log(contentString);
                    vm.infowindow[i] = (new google.maps.InfoWindow({
                        content: contentString,
                        position: pos
                    }));
                    vm.marker[i] = new google.maps.Marker({
                        position: pos,
                        map: $scope.map,
                        label: datos[i].id.toString(),
                        title: i.toString()
                    });
                    vm.marker[i].addListener('click', function (id) {
                        console.log(id.ua.target.title);
                        var select = parseInt(id.ua.target.title);
                        vm.infowindow[select].open($scope.map);
                    });

                }
            });
        };

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf thinkster.layout.controllers.IndexController
         */
        function activate() {

            Posts.getUsers().then(usersSuccessFn, usersErrorFn);


            /**
             * @name usersSuccessFn
             * @desc Update users array on view
             */
            function usersSuccessFn(data, status, headers, config) {
                vm.users = data.data;
                $scope.itemArray = data.data;
                vm.selected = {
                    value: $scope.itemArray[0]
                };
                // makeMap($scope.selected.username);
                Snackbar.show('Acceso Concedido');
            }


            /**
             * @name usersErrorFn
             * @desc Show snackbar with error
             */
            function usersErrorFn(data, status, headers, config) {
                Snackbar.error(data.data.message);
            }
        }
    }
})();

/**
 * NavbarController
 * @namespace thinkster.layout.controllers
 */
(function () {
    'use strict';

    angular
        .module('thinkster.layout.controllers')
        .controller('NavbarController', NavbarController);

    NavbarController.$inject = ['$scope', 'Authentication', '$location'];

    /**
     * @namespace NavbarController
     */
    function NavbarController($scope, Authentication, $location) {
        var vm = this;

        vm.logout = logout;
        activate();

        /**
         * @name activate
         * @desc Actions to be performed when this controller is instantiated
         * @memberOf thinkster.authentication.controllers.LoginController
         */
        function activate() {
            // If the user is authenticated, they should not be here.
            if (Authentication.isAuthenticated()) {
                console.log('hi');
                $location.url('/informacion');
            }
        }
        /**
         * @name logout
         * @desc Log the user out
         * @memberOf thinkster.layout.controllers.NavbarController
         */
        function logout() {
            Authentication.logout();
        }
    }
})();

(function () {
    'use strict';

    angular
        .module('thinkster.posts', [
            'thinkster.posts.controllers',
            'thinkster.posts.directives',
            'thinkster.posts.services'
        ]);

    angular
        .module('thinkster.posts.controllers', []);

    angular
        .module('thinkster.posts.directives', ['ngDialog']);

    angular
        .module('thinkster.posts.services', []);
})();

/**
 * NewPostController
 * @namespace thinkster.posts.controllers
 */
(function () {
    'use strict';

    angular
        .module('thinkster.posts.controllers')
        .controller('NewPostController', NewPostController);

    NewPostController.$inject = ['$rootScope', '$scope', 'Authentication', 'Snackbar', 'Posts'];

    /**
     * @namespace NewPostController
     */
    function NewPostController($rootScope, $scope, Authentication, Snackbar, Posts) {
        var vm = this;

        vm.submit = submit;

        /**
         * @name submit
         * @desc Create a new Post
         * @memberOf thinkster.posts.controllers.NewPostController
         */
        function submit() {
            $rootScope.$broadcast('post.created', {
                content: vm.content,
                author: {
                    username: Authentication.getAuthenticatedAccount().username
                }
            });

            $scope.closeThisDialog();

            Posts.create(vm.content).then(createPostSuccessFn, createPostErrorFn);


            /**
             * @name createPostSuccessFn
             * @desc Show snackbar with success message
             */
            function createPostSuccessFn(data, status, headers, config) {
                Snackbar.show('Success! Post created.');
            }


            /**
             * @name createPostErrorFn
             * @desc Propogate error event and show snackbar with error message
             */
            function createPostErrorFn(data, status, headers, config) {
                $rootScope.$broadcast('post.created.error');
                Snackbar.error(data.error);
            }
        }
    }
})();

/**
 * PostsController
 * @namespace thinkster.posts.controllers
 */
(function () {
    'use strict';

    angular
        .module('thinkster.posts.controllers')
        .controller('PostsController', PostsController);

    PostsController.$inject = ['$scope'];

    /**
     * @namespace PostsController
     */
    function PostsController($scope) {
        var vm = this;


    }
})();

/**
 * Post
 * @namespace thinkster.posts.directives
 */
(function () {
    'use strict';

    angular
        .module('thinkster.posts.directives')
        .directive('post', post);

    /**
     * @namespace Post
     */
    function post() {
        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf thinkster.posts.directives.Post
         */
        var directive = {
            restrict: 'E',
            scope: {
                post: '='
            },
            templateUrl: '/static/templates/posts/post.html'
        };

        return directive;
    }
})();

/**
 * Posts
 * @namespace thinkster.posts.directives
 */
(function () {
    'use strict';

    angular
        .module('thinkster.posts.directives')
        .directive('posts', posts);

    /**
     * @namespace Posts
     */
    function posts() {
        /**
         * @name directive
         * @desc The directive to be returned
         * @memberOf thinkster.posts.directives.Posts
         */
        var directive = {
            controller: 'PostsController',
            controllerAs: 'vm',
            restrict: 'E',
            scope: {
                posts: '='
            },
            templateUrl: '/static/templates/posts/posts.html'
        };

        return directive;
    }
})();

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

(function () {
    'use strict';

    angular
        .module('thinkster.utils', [
            'thinkster.utils.services'
        ]);

    angular
        .module('thinkster.utils.services', []);
})();

/**
 * Snackbar
 * @namespace thinkster.utils.services
 */
(function ($, _) {
    'use strict';

    angular
        .module('thinkster.utils.services')
        .factory('Snackbar', Snackbar);

    /**
     * @namespace Snackbar
     */
    function Snackbar() {
        /**
         * @name Snackbar
         * @desc The factory to be returned
         */
        var Snackbar = {
            error: error,
            show: show
        };

        return Snackbar;

        ////////////////////

        /**
         * @name _snackbar
         * @desc Display a snackbar
         * @param {string} content The content of the snackbar
         * @param {Object} options Options for displaying the snackbar
         */
        function _snackbar(content, options) {
            options = _.extend({
                timeout: 3000
            }, options);
            options.content = content;

            $.snackbar(options);
        }


        /**
         * @name error
         * @desc Display an error snackbar
         * @param {string} content The content of the snackbar
         * @param {Object} options Options for displaying the snackbar
         * @memberOf thinkster.utils.services.Snackbar
         */
        function error(content, options) {
            _snackbar('Error: ' + content, options);
        }


        /**
         * @name show
         * @desc Display a standard snackbar
         * @param {string} content The content of the snackbar
         * @param {Object} options Options for displaying the snackbar
         * @memberOf thinkster.utils.services.Snackbar
         */
        function show(content, options) {
            _snackbar(content, options);
        }
    }
})($, _);