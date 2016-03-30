/**
 * Created by Andrew on 3/15/16.
 */

var mock = require("./room.mock.json");
module.exports = function (uuid) {

    var api = {
        createRoom: createRoom,
        findAllRooms: findAllRooms,
        findRoomById: findRoomById,
        updateRoom: updateRoom,
        deleteRoom: deleteRoom,
        findRoomsByUserId: findRoomsByUserId
    };
    return api;

    function createRoom(room) {
        room._id = uuid.v1();
        mock.push(room);
        return room;
    }

    function updateRoom(roomId, room) {
        console.log(roomId);
        for (var u in mock) {
            if (mock[u]._id == roomId) {
                mock[u].name = room.name;
                mock[u].issues = room.issues;
                mock[u].creator = room.creator;
                return mock[u];
            }
        }
    }

    function findRoomById(roomId) {
        for (u in mock) {
            if (mock[u]._id == roomId) {
                return mock[u];
            }
        }
        return null;
    }

    function deleteRoom(roomId) {
        for (var u in mock) {
            if (mock[u]._id == roomId) {
                mock.splice(u, 1);
                return true;
            }
        }
    }

    function findAllRooms() {
        return mock;
    }

    function findRoomsByUserId(userId){
        var listOfRooms = [];
        for (var f in mock) {
            if (mock[f].userId == userId) {
                listOfRooms.push(mock[f]);
            }
        }
        return listOfRooms;

    }

};