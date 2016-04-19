module.exports = function (app, issueModel, multer, fs) {


    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './public/project/server/photos/')

        },
        filename: function (req, file, cb) {
            var datetimestamp = Date.now();
            cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
        }
    });

    var upload = multer({storage: storage});

    app.get("/api/project/user/:userId/issue", getIssuesForUser);
    app.get("/api/project/issue/:issueId", getIssueById);
    app.delete("/api/project/issue/:issueId", deleteIssue);
    app.post("/api/project/user/:userId/issue/", createIssueForUser);
    app.put("/api/project/issue/:issueId", updateIssue);
    app.post("/api/project/photo/", upload.single('file'), uploadPhoto);
    app.get("/api/project/user/photo", findPhoto);
    app.get("/api/project/issue/all/:roomId", getIssuesByRoomId);

    function getIssuesByRoomId(req, res){

      var roomId = req.params.roomId;

       issueModel.getIssuesByRoomId(roomId)
                  .then(
                      function ( doc ) {
                          res.json(doc);
                      },
                      // send error if promise rejected
                      function ( err ) {
                          res.status(400).send(err);
                      }
                  );
    }


    function uploadPhoto(req, res){
        //Return the path to the uploaded file.
        res.json(req.file.path);
    }

    function getIssuesForUser(req, res) {
        var userId = req.params.userId;

        userId = issueModel.findIssuesByUserId(userId)
                    .then(
                        function ( doc ) {
                            res.json(doc);
                        },
                        // send error if promise rejected
                        function ( err ) {
                            res.status(400).send(err);
                        }
                    );
    }

    function getIssueById(req, res) {
        var issueId = req.params.issueId;

        issueId = issueModel.findIssueById(issueId)
                    .then(
                        function(doc){
                            res.json(doc);
                        },
                        function(err){
                            res.status(200).send(err);

                        }
                    );
    }

    function deleteIssue(req, res) {
        var issueId = req.params.issueId;

        issueId = issueModel.deleteIssue(issueId)
                    .then(
                        function ( doc ) {
                            res.json(doc);
                        },
                        // send error if promise rejected
                        function ( err ) {
                            res.status(200).send(err);
                        }
                    );
    }

    function createIssueForUser(req, res) {
        var userId = req.params.userId;
        var issue = req.body;


        form = issueModel.createIssueForUser(issue, userId)
          .then(
              function ( doc ) {
                  res.json(doc);
              },
              // send error if promise rejected
              function ( err ) {
                  res.status(400).send(err);
              }
          );
  }

    function updateIssue(req, res) {
        var issueId = req.params.issueId;
        var issue = req.body;

        console.log("The image:" + issue.image);
        issue = issueModel.updateIssue(issueId, issue)
                    .then(
                        function ( doc ) {
                            console.log("Issue updated...." + doc);
                            res.json(doc);
                        },
                        // send error if promise rejected
                        function ( err ) {
                            res.status(400).send(err);
                        }
                    );
    }

    function findPhoto(req, res) {
        var file = req.params[0];
        var publicIndex = __dirname.lastIndexOf("public") - 1;
        var rootPath = __dirname.substring(0,publicIndex) + "/";
        var path = rootPath + file;
        fs.readFile(path,function(error, photo) {
            res.send(photo);
        });
    }
};
