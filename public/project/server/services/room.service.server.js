module.exports = function (app, roomModel) {
    app.get("/api/project/room/:userId/room", getRoomsForUser);
    app.get("/api/project/room/:roomId", getRoomById);
    app.delete("/api/project/room/:roomId", deleteRoom);
    app.post("/api/project/room/:userId/room", createRoomForUser);
    app.put("/api/project/room/:roomId", updateRoom);

    function getRoomsForUser(req, res) {
        var userId = req.params.userId;
        res.json(roomModel.findRoomsByUserId(userId));
    }

    function getRoomById(req, res) {
        var roomId = req.params.roomId;
        res.json(roomModel.findRoomById(roomId));
    }

    function deleteRoom(req, res) {
        var roomId = req.params.roomId;
        roomModel.deleteRoom(roomId);
        res.send(200);
    }

    function createRoomForUser(req, res) {
        var userId = req.params.userId;
        var room = req.body;
        res.json(roomModel.createRoom(room, userId));
    }

    function updateRoom(req, res) {
        var roomId = req.params.roomId;
        var room = req.body;
        console.log(room);
        console.log(roomId);
        res.json(roomModel.updateRoom(roomId, room));
    }
};