/**
 * Created by Andrew on 3/15/16.
 */

var mock = require("./user.mock.json");
module.exports = function () {

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials
    };
    return api;

    function createUser(user){
        user._id = "ID_" + (new Date()).getTime();
        mock.push(user);
        return user;
    }

    function updateUser(userId, user){
        console.log(userId);
        for (var u in mock) {
            if (mock[u]._id == userId) {
                mock[u].username = user.username;
                mock[u].firstName = user.firstName;
                mock[u].lastName = user.lastName;
                mock[u].password = user.password;
                console.log("update user..." + mock[u]);
                return mock[u];
            }
        }
    }

    function findUserById(userId){
        for(u in mock){
            if(mock[u]._id === userId){
                return mock[u];
            }
        }
        return null;
    }

    function deleteUser(userId){
        for (var u in mock){
            if (mock[u]._id === userId){
                mock.splice(userId, 1);
            }
        }
    }

    function findAllUsers(){
            return mock;
    }

    function findUserByUsername(username){
        for(u in mock){
            if(mock[u].username === username){
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(username, password) {
        for(u in mock){
            if(mock[u].username == username &&
               mock[u].password == password){
                return mock[u];
            }
        }
    }

};