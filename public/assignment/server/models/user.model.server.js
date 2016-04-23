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
        var deferred = q.defer();

        //user =  {username: user.username,
        //    password: user.password,
        //    firstName: user.firstName,
        //    lastName: user.lastName,
        //    emails: user.emails,
        //    phones: user.phones}

        //Note: need to use $set if MongoDB = 2.4.x

        UserModel.findByIdAndUpdate(userId, user, {new:true}, function(err, doc){
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
        console.log("deleting user")
         var deferred = q.defer();

        return UserModel.remove({_id: userId});
    }

    function findAllUsers() {
        console.log("here3")
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.find({},

            // first argument is predicate


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


    function findUserByUsername(username) {
      var deferred = q.defer();

      // find one retrieves one document
      UserModel.findOne(

          // first argument is predicate
          { username: username},

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

    function findUserByCredentials(credentials) {
        var deferred = q.defer();

        // find one retrieves one document
        UserModel.findOne(

            // first argument is predicate
            { username: credentials.username,
                password: credentials.password },

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
