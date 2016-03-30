/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("ProjectIssuesApp")
        .controller("RoomController", RoomController);

    function RoomController(RoomService, $rootScope) {

        var vm = this;
        vm.addRoom = addRoom;
        vm.updateRoom = updateRoom;
        vm.selectRoom = selectRoom;
        vm.deleteRoom = deleteRoom;


        function showRooms() {
            RoomService.findAllRoomsForUser($rootScope.currentUser._id)
                .then(function(response){
                    if(response.data){
                        console.log(response.data);
                        vm.rooms = response.data;
                    }
                });
        }

        showRooms();

        function addRoom(room) {
            RoomService.createRoomForUser($rootScope.currentUser._id, room)
                .then(function(response){
                    if(response.data){
                        console.log(response.data);
                        vm.rooms.push(response.data);
                    }

                });
        }

        function updateRoom(room){
            RoomService.updateRoomById(room._id, room)
                .then(function(response){
                    if(response.data){
                        console.log(response.data);
                        delete vm.room;
                    }
                });
            //delete $scope.user;
        }

        function selectRoom(roomIndex){
            //Select the issue
            vm.room = vm.rooms[roomIndex];
        }

        function deleteRoom(roomIndex){
            var roomId = vm.rooms[roomIndex]._id;
            //Delete the selected issue
            console.log(roomId);
            RoomService.deleteRoomById(roomId)
                .then(showRooms())
        }
    }
})();