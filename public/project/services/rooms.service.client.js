/**
 * Created by Andrew on 3/11/16.
 */
(function() {
    angular
        .module("ProjectIssuesApp")
        .factory("RoomService", RoomService);

    function RoomService() {
        var model = {
            rooms: [
                {"_id": "000", "name": "Andrew's Room", "issues": "1", "creator": "Andrew",  "userId": 0},
                {"_id": "001", "name": "Office", "issues": "3", "creator": "Brian", "userId": 1},
                {"_id": "002", "name": "Hotel room", "issues": "2", "creator": "Adam","userId": 0},
                {"_id": "003", "name": "Office", "issues": "4", "creator": "Josh", "image": 3, "userId": 0}
            ]
            ,
            createRoomForUser: createRoomForUser,
            findAllRoomsForUser: findAllRoomsForUser,
            deleteRoomById: deleteRoomById,
            updateRoomById: updateRoomById
        };
        return model;

        function createRoomForUser(userId, room, callback) {
            var room = {
                _id: (new Date).getTime(),
                name: room.name,
                issues: room.issues,
                assignee: room.assignee,
                creator: room.creator,
                userId: userId
            };
            model.rooms.push(room);
            callback(room);
        }

        function findAllRoomsForUser(userId, callback) {
            var listOfRooms = [];
            for (var room in model.rooms) {
                if (model.rooms[room].userId === userId) {
                    listOfRooms.push(model.rooms[room]);
                }
            }
            callback(listOfRooms);

        }

        function deleteRoomById(roomId, callback) {
            for (var room in model.rooms) {
                if (model.rooms[room]._id === roomId) {
                    model.rooms.splice(room, 1);
                }
                console.log(roomId)
                callback(model.rooms);
            }
        }

        function updateRoomById(roomId, newRoom, callback) {
            for (var room in model.rooms) {
                if (model.rooms[room]._id === roomId) {
                    model.rooms[room].name = newRoom.name;
                    model.rooms[room].issues = newRoom.issues;
                    model.rooms[room].creator = newRoom.creator;
                    callback(model.rooms[room]);
                }
            }
        }
    }
})();