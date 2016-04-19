/**
 * Created by Andrew on 3/11/16.
 */
(function() {
    angular
        .module("ProjectIssuesApp")
        .factory("RoomService", roomService);

    function roomService($http) {

        var api = {
            createRoomForUser: createRoomForUser,
            findAllRoomsForUser: findAllRoomsForUser,
            deleteRoomById: deleteRoomById,
            updateRoomById: updateRoomById,
            findRoomById: findRoomById,
            findRoomsUserBelongs: findRoomsUserBelongs,
            updateRoomIssuesById: updateRoomIssuesById
        };
        return api;

        function createRoomForUser(userId, room) {
            return $http.post("/api/project/room/" + userId + "/room", room);
        }

        function findAllRoomsForUser(userId) {
            return $http.get("/api/project/room/" + userId + "/room");
        }

        function findRoomsUserBelongs(userId){
          return $http.get("/api/project/room/" + userId + "/room/all/")
        }

        function deleteRoomById(roomId, room) {
            return $http.delete("/api/project/room/" + roomId, room);
        }

        function updateRoomById(roomId, room) {
            return $http.put("/api/project/room/" + roomId, room);
        }

        function updateRoomIssuesById(roomId, issueId){
          return $http.put("/api/project/room/" + roomId + "/" +  issueId);
        }

        function findRoomById(roomId, room){
          return $http.get("/api/project/room/" + roomId, room);
        }
    }
})();
