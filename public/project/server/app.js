module.exports = function(app, uuid, db, mongoose, multer, fs) {
    var issueModel = require("./models/issue.model.server.js")(uuid, db, mongoose);
    var userModel = require("./models/user.model.server.js")(uuid, db, mongoose);
    var searchModel = require("./models/search.model.server.js")(uuid, issueModel, userModel);
    var roomModel = require("./models/room.model.server.js")(uuid);

    var userService = require("./services/user.service.server.js")(app, userModel);
    var issueService = require("./services/issue.service.server.js")(app, issueModel, multer);
    var searchService = require("./services/search.service.server.js")(app, searchModel);
    var roomService = require("./services/room.service.server.js")(app, roomModel);
}
