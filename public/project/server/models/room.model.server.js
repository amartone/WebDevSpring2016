/**
 * Created by Andrew on 3/15/16.
 */

var mock = require("./room.mock.json");

var q = require("q");

module.exports = function (uuid) {


  var RoomSchema= require("./room.schema.server.js")(mongoose);
  var RoomModel = mongoose.model('Room', RoomSchema);

    var api = {
        createRoom: createRoom,
        findAllRooms: findAllRooms,
        findRoomById: findRoomById,
        updateRoom: updateRoom,
        deleteRoom: deleteRoom,
        findRoomsByUserId: findRoomsByUserId
    };
    return api;

    function createRoomForUser(room) {
      room.createdAt = (new Date()).getTime();

        var deferred = q.defer();
        RoomModel.create(room, function(err, doc){
                    if (err) {
                        // reject promise if error
                        deferred.reject(err);
                    } else {
                        // resolve promise
                        deferred.resolve(doc);
                    }

                });
                // return a promise
                return deferred.promise;
    }


    function updateRoom(roomId, room) {
      var deferred = q.defer();

      RoomModel.findByIdAndUpdate(roomId, {$set: issue}, {new:true, upsert:true}, function (err, doc) {
                  if (err) {
                        deferred.reject(err);
                  } else {
                      console.log("Room updated in model: " + doc);
                      deferred.resolve(doc);
                  }
              });
              return deferred.promise;
          }


    function findRoomById(roomId) {
      var deferred = q.defer();

      RoomModel.findById(roomId, function(err, doc) {
          if (err) {
              deferred.reject(err);
          } else {
              deferred.resolve(doc);
          }
      });
      return deferred.promise;
  }

    function deleteRoom(roomId) {
      var deferred = q.defer();

      RoomModel.remove({_id: roomId}, function (err, doc) {
          if (err) {
              deferred.reject(err);
          } else {
              deferred.resolve(doc);
          }
      });
      return deferred.promise;
    }

    function findAllRooms() { //need to refactor
        return mock;
    }

    function findRoomsByUserId(userId){
      var deferred = q.defer();

      RoomModel.find({userId: userId}, function (err, doc) {
          if (err) {
              deferred.reject(err);
          } else {
              deferred.resolve(doc);
          }
      });
      return deferred.promise;
  }

};
