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