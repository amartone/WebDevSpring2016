/**
 * Created by Andrew on 2/23/16.
 */
"use strict";

(function()
{
    angular
        .module("FormBuilderApp")
        .controller("AdminController", AdminController);

    function AdminController($scope, UserService)
    {
        var vm = this;
        vm.removeUser = remove;
        vm.updateUser = update;
        vm.addUser    = add;
        vm.selectUser = select;
        vm.predicate = 'username';
        vm.reverse = true;
        vm.order = function(predicate) {
            vm.reverse = (vm.predicate === predicate) ? !vm.reverse : false;
            vm.predicate = predicate;
        };


        function init() {
            UserService
                .findAllUsers()
                .then(function(response){
                    if(response.data){
                        vm.users = response.data;
                        console.log("Admin users: " + response.data)
                    }

                });
        }
        init();

        function remove(user)
        {
            UserService
                .deleteUser(user._id)
                .then(function(response){
                    if(response){
                        init();
                    }

                });
        }

        function update(user)
        {
            UserService
                .updateUser(user._id, user)
                .then(function(response){

                    if(response){
                        init();
                    }
                });
        }

        function add(user)
        {
            UserService
                .adminCreateUser(user)
                .then(function(response){

                    if(response.data){
                        init();

                    }

                });
        }

        function select(user)
        {
            vm.user = angular.copy(user);
        }

    }
})();