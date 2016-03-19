/**
 * Created by Andrew on 3/15/16.
 */
module.exports = function (app, formModel, userModel) {
    app.post("/api/assignment/user", register);
    app.get("/api/assignment/user/:id", findUserById);
    app.put("/api/assignment/user/:id", updateUser);
    //app.get("/api/assignment/user?username=username", findUserByUsername);
    app.get("/api/assignment/user", apiRouter);
    app.delete("/api/assignment/user/:id", deleteUser);
    app.post("/api/assignment/logout", logout);


    function apiRouter(req, res) {
        if (req.query.username && req.query.password) {
            console.log("made");
            findUserByCredentials(req, res);
        }
        else if (req.query.username) {
            findUserByUsername(req, res);

        } else {
            findAllUsers(req, res);
        }

    }

    function updateUser(req, res) {
        var userId = req.params.id;
        var user = req.body;
        res.json(userModel.updateUser(userId, user));
        console.log("Successfully updated user: " + user.username);
    }

    function register(req, res) {
        var user = req.body;
        user = userModel.createUser(user);
        req.session.currentUser = user;
        res.json(user);
        console.log("Sucessfully registered user: " + user.username);
    }

    function findAllUsers(req, res) {
        var users = userModel.findAllUsers();
        res.json(users);
    }

    function findUserById(req, res) {
        var userId = req.params.id;
        var user = userModel.findUserById(userId);
        res.json(user);
    }

    function findUserByUsername(req, res) {
        var username = req.params.username;
        var user = userModel.findByUsername(username);
        res.json(user);
    }

    function findUserByCredentials(req, res) {
        var user = req.query.username;
        var password = req.query.password;
        console.log(user);
        var userName = userModel.findUserByCredentials(user, password);
        res.json(userName);
    }

    function deleteUser(req, res) {
        var userId = req.params.id;
        userModel.deleteUser(userId);
        res.send(200);
    }

    function logout(req, res) {
        userModel.setCurrentUser(null);
    }

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
