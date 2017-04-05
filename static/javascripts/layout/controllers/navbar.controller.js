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