/**
 * Created by Andrew on 3/15/16.
 */

   var passport         = require('passport');
   var LocalStrategy    = require('passport-local').Strategy;

module.exports = function (app, formModel, userModel) {

   var auth = authorized;

    app.post('/api/assignment/login', passport.authenticate('local'), login);
    app.post("/api/assignment/logout", logout);
    app.post("/api/assignment/register", register);
    app.post("/api/assignment/user", auth, adminCreateUser);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", auth, updateUser);
    //app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user", auth, apiRouter);
    app.delete("/api/assignment/user/:id", auth, deleteUser);
    app.get("/api/assignment/loggedIn", loggedIn);

    passport.use(new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);


    function localStrategy(username, password, done) {
          userModel
              .findUserByCredentials({username: username, password: password})
              .then(
                  function(user) {
                      if (!user) { return done(null, false); }
                      return done(null, user);
                  },
                  function(err) {
                      if (err) { return done(err); }
                  }
              );
      }

      function serializeUser(user, done) {
          done(null, user);
      }

      function deserializeUser(user, done) {
          userModel
              .findUserById(user._id)
              .then(
                  function(user){
                      done(null, user);
                  },
                  function(err){
                      done(err, null);
                  }
              );
      }

    function loggedIn(req, res){

      res.send(req.isAuthenticated() ? req.user : '0');

        // console.log(req.session.currentUser);
        // res.json(req.session.currentUser);
    }

    function apiRouter(req, res) {
      if (req.query.username) {
            findUserByUsername(req, res);

        } else {
          findAllUsers(req, res);
        }
    }

    function updateUser(req, res) {
        var newUser = req.body;

        if(!isAdmin(req.user)) {
            delete newUser.roles;
        }
        if(typeof newUser.roles == "string") {
            newUser.roles = newUser.roles.split(",");
        }

        userModel
            .updateUser(req.params.id, newUser)
            .then(
                function(user){
                    return userModel.findAllUsers();
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(err){
                    res.status(400).send(err);
                }
            );
    }

    function register(req, res) {
        var newUser = req.body;
        // user = userModel.createUser(user)
        newUser.roles = ['admin'];
        userModel
           .findUserByUsername(newUser.username)
           .then(
               function(user){
                   if(user) {
                       res.json(null);
                   } else {
                       return userModel.createUser(newUser);
                   }
               },
               function(err){
                   res.status(400).send(err);
               }
           )
           .then(
               function(user){
                   if(user){
                       req.login(user, function(err) {
                           if(err) {
                               res.status(400).send(err);
                           } else {
                               res.json(user);
                           }
                       });
                   }
               },
               function(err){
                   res.status(400).send(err);
               }
           );
   }




    function adminCreateUser(req, res) {
        var newUser = req.body;
        if(newUser.roles && newUser.roles.length > 1) {
            newUser.roles = newUser.roles.split(",");
        } else {
            newUser.roles = ["student"];
        }

        // first check if a user already exists with the username
        userModel
            .findUserByUsername(newUser.username)
            .then(
                function(user){
                    // if the user does not already exist
                    if(user == null) {
                        // create a new user
                        return userModel.createUser(newUser)
                            .then(
                                // fetch all the users
                                function(){
                                    return userModel.findAllUsers();
                                },
                                function(err){
                                    res.status(400).send(err);
                                }
                            );
                        // if the user already exists, then just fetch all the users
                    } else {
                        return userModel.findAllUsers();
                    }
                },
                function(err){
                    res.status(400).send(err);
                }
            )
            .then(
                function(users){
                    res.json(users);
                },
                function(){
                    res.status(400).send(err);
                }
            )
    }

    //         // handle model promise
    //         .then(
    //             // login user if promise resolved
    //             function ( doc ) {
    //                 req.session.currentUser = doc;
    //                 res.json(doc);
    //             },
    //             // send error if promise rejected
    //             function ( err ) {
    //                 res.status(400).send(err);
    //             }
    //         );
    // }

    function findAllUsers(req, res) {
        console.log("here2")
        if(isAdmin(req.user)) {
            userModel
                .findAllUsers()
                .then(
                    function (users) {
                        res.json(users);
                    },
                    function () {
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }

    function findUserById(req, res) {
        var userId = req.params.userId;

        // use model to find user by id
        var user = userModel.findUserById(userId)
            .then(
                // return user if promise resolved
                function (doc) {
                    //we'll work on movie model a bit later
                    //var movieImdbIDs = user.likes;
                    //var movies = movieModel.findMoviesByImdbIDs(movieImdbIDs);
                    //user.likesMovies = movies;
                    res.json(doc);
                },
                // send error if promise rejected
                function (err) {
                    res.status(400).send(err);
                }
            );
    }
    function findUserByUsername(req, res) {
        var username = req.params.username;
        var user = userModel.findByUsername(username);
        res.json(user);
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function deleteUser(req, res) {
        if(isAdmin(req.user)) {

            userModel
                .deleteUser(req.params.id)
                .then(
                    function(doc){
                        return userModel.findAllUsers();
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                )
                .then(
                    function(users){
                        res.json(users);
                    },
                    function(err){
                        res.status(400).send(err);
                    }
                );
        } else {
            res.status(403);
        }
    }


    function logout(req, res) {
        req.logOut();
        res.send(200);
        // userModel.setCurrentUser(null);
    }

    function isAdmin(user) {
        if(user.roles.indexOf("admin") != -1) {
            return true
        }
        return false;
    }

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    };

}
