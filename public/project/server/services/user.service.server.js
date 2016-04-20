/**
 * Created by Andrew on 3/15/16.
 */
module.exports = function (app, userModel, multer) {



    app.post("/api/project/user", register);
    app.get("/api/project/user/:id", findUserById);
    app.put("/api/project/user/:id", updateUser);
    //app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/project/user", apiRouter);
    app.delete("/api/project/user/:id", deleteUser);
    app.post("/api/project/logout", logout);
    app.get("/api/project/loggedin", loggedIn);


    function apiRouter(req, res) {
        if (req.query.username && req.query.password) {
            findUserByCredentials(req, res);
        }
        else if (req.query.username) {
            findUserByUsername(req, res);

        } else {
            findAllUsers(req, res);
        }

    }


    function loggedIn(req, res){
        res.json(req.session.currentUser);
    }
    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;

        user = userModel.updateUser(userId, user)
                  .then(function(doc){
                          req.session.currentUser = doc;
                          res.json(doc);
                  },
                      function(err){
                          res.status(400).send(err);
                      }

                  );
            }

    function register(req, res) {
      var user = req.body;
        user = userModel.createUser(user)
            // handle model promise
            .then(
                // login user if promise resolved
                function ( doc ) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }


    function findAllUsers(req, res) {
        var users = userModel.findAllUsers()
          .then(
            function(doc){
              res.json(doc)
            },
            function(err){
              res.status(400).send(err);
            }
          );
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

    function findUserByCredentials(req, res) {
      var username = req.query.username;
        var password = req.query.password;

        var user = userModel.findUserByCredentials(username, password)
            .then(
                function (doc) {
                    req.session.currentUser = doc;
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        userModel.deleteUser(userId)
        .then(
            function (doc) {
                res.json(doc);
            },
            // send error if promise rejected
            function ( err ) {
                res.status(400).send(err);
            }
        );
    }


      function logout(req, res) {
            req.session.currentUser = null;
            res.json(req.session.currentUser);
        }


    //Potentially remove
    function login(req, res) {
        var credentials = req.body;
        var user = userModel.findUserByCredentials(credentials);
        req.session.currentUser = user;
        res.json(user);
    }

    function loggedin(req, res) {
        res.json(req.session.currentUser);
    }
}
