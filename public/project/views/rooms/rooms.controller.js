/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .controller("RoomController", RoomController);

    function RoomController(RoomService, $scope, $rootScope) {
        $scope.addRoom = addRoom;
        $scope.updateRoom = updateRoom;
        $scope.deleteRoom = deleteRoom;
        $scope.selectRoom = selectRoom;

        function showRooms() {
            var callback = function(response){
                $scope.rooms = response;
                console.log($scope.rooms);
            };

            RoomService.findAllRoomsForUser($rootScope.currentUser._id, callback);
        }

        showRooms();

        function addRoom(room) {
            RoomService.createRoomForUser($rootScope.currentUser._id, room, showRooms);
        }

        function updateRoom(room){
            RoomService.updateRoomById(room._id, room, showRooms);
            delete $scope.room;
        }

        function selectRoom(roomIndex){
            //Select the issue
            $scope.room = $scope.rooms[roomIndex];
        }

        function deleteRoom(room){
            //Delete the selected issue
            console.log(room)
            RoomService.deleteRoomById(room._id, showRooms);
        }
    }
})();