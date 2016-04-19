module.exports = function (app, roomModel) {
    app.get("/api/project/room/:userId/room", getRoomsForUser);
    app.get("/api/project/room/:roomId", getRoomById);
    app.delete("/api/project/room/:roomId", deleteRoom);
    app.post("/api/project/room/:userId/room", createRoomForUser);
    app.put("/api/project/room/:roomId", updateRoom);
    app.get("/api/project/room/:userId/room/all", getRoomsUserBelongsTo);
    app.put("/api/project/room/:roomId/:issueId", updateRoomIssuesById);


function updateRoomIssuesById(req, res){
var roomId = req.params.roomId;
var issueId = req.params.issueId;

roomModel.updateRoomIssuesById(roomId, issueId)
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

    function getRoomsUserBelongsTo(req, res){
      var userId = req.params.userId;
      userId = roomModel.findRoomsUserBelongs(userId)
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


    function getRoomsForUser(req, res) {
      var userId = req.params.userId;

      userId = roomModel.findRoomsByUserId(userId)
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

    function getRoomById(req, res) {
        var roomId = req.params.roomId;

        roomId = roomModel.findRoomById(roomId)
                    .then(
                        function(doc){
                            res.json(doc);
                        },
                        function(err){
                            res.status(200).send(err);
                        }
                    );
    }

    function deleteRoom(req, res) {
        var roomId = req.params.roomId;

        roomId = roomModel.deleteIssue(issueId)
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

    function createRoomForUser(req, res) {
        var userId = req.params.userId;
        var room = req.body;

        room = roomModel.createRoomForUser(room, userId)
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

    function updateRoom(req, res) {
        var roomId = req.params.roomId;
        var room = req.body;
        room = roomModel.updateRoom(roomId, room)
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
};
