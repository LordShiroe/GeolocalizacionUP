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