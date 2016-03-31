/**
 * Created by Andrew on 3/15/16.
 */

var mock = require("./user.mock.json");
var q = require("q");
module.exports = function (db, mongoose) {


    var UserSchema = require("./user.schema.server.js")(mongoose);

    // create user model from schema
    var UserModel = mongoose.model('User', UserSchema);


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

    function createUser(user) {

        var deferred = q.defer();
       UserModel.create(user, function(err, doc){

           if (err) {
               // reject promise if error
               deferred.reject(err);
           } else {
               // resolve promise
               deferred.resolve(doc);
           }

       });
        // return a promise
        return deferred.promise;
    }

    function updateUser(userId, user) {
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

    function findUserById(userId) {

        var deferred = q.defer();
        UserModel.findById(userId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        for (var u in mock) {
            if (mock[u]._id === userId) {
                mock.splice(userId, 1);
            }
        }
    }

    function findAllUsers() {
        return mock;
    }

    function findUserByUsername(username) {
        for (u in mock) {
            if (mock[u].username === username) {
                return mock[u];
            }
        }
        return null;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: username,
                password: password },

            // doc is unique instance matches predicate
            function(err, doc) {

                if (err) {
                    // reject promise if error
                    deferred.reject(err);
                } else {
                    // resolve promise
                    deferred.resolve(doc);
                }

            });

        return deferred.promise;
    }

};