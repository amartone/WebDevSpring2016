/**
 * Created by Andrew on 2/29/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("UserService", UserService);

    function UserService($rootScope) {
        var model = {
            users: [
                {	"_id":0, "firstName":"Andrew",            "lastName":"Martone",
                    "username":"andrew.m",  "password":"andrew.m",   "roles": ["Roommate"]		},
                {	"_id":1, "firstName":"Bob",              "lastName":"Hope",
                    "username":"bob",    "password":"bob",     "roles": ["admin"]		},
                {	"_id":2, "firstName":"Charlie",          "lastName":"Brown",
                    "username":"charlie","password":"charlie", "roles": ["faculty"]		},
                {	"_id":3, "firstName":"Dan",              "lastName":"Craig",
                    "username":"dan",    "password":"dan",     "roles": ["faculty", "admin"]},
                {	"_id":4, "firstName":"Edward",           "lastName":"Norton",
                    "username":"ed",     "password":"ed",      "roles": ["student"]		}
            ]
            ,
            createUser: createUser,
            findUserByCredentials: findUserByCredentials,
            findAllUsers: findAllUsers,
            updateUser: updateUser,
            deleteUserById: deleteUserById,
            setCurrentUser: setCurrentUser
            //getCurrentUser: getCurrentUser
        };
        return model;
        //
        function setCurrentUser (user) {
            $rootScope.currentUser = user;
        }
        //
        //function getCurrentUser () {
        //    return $rootScope.currentUser;
        //}

        function createUser (user, callback) {
            var user = {

                _id: (new Date).getTime(),
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                password: user.password,
                roles: user.roles
            };
            model.users.push(user);
            callback(user);}


        function deleteUserById(userId, callback){
            for (var u in model.users){
                if (model.users[u]._id === userId){
                    model.users.splice(userId, 1);
                }
            }
            callback(model.users);
        }


        function findAllUsers (callback) {
            if(model.users.length>0){
            callback(model.users);
            }

        }

        function findUserByCredentials(username, password, callback) {
            for (var u in model.users) {
                if (model.users[u].username === username &&
                    model.users[u].password === password) {
                    callback(model.users[u]);
                }
            }
        }

        function updateUser (userId, user, callback) {
            for (var u in model.users) {
                if (model.users[u]._id === userId) {
                    model.users[u].username = user.username;
                    model.users[u].firstName = user.firstName;
                    model.users[u].lastName = user.lastName;
                    model.users[u].password = user.password;
                    model.users[u].roles = user.roles;

                    callback(model.users[u]);
                }
            }

        }
    }
})();