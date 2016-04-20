/**
 * Created by Andrew on 3/15/16.
 */

var mock = require("./room.mock.json");

var q = require("q");

module.exports = function (db, mongoose) {


  var RoomSchema = require("./room.schema.server.js")(mongoose);
  var RoomModel = mongoose.model('Room', RoomSchema);

    var api = {
        createRoomForUser: createRoomForUser,
        findAllRooms: findAllRooms,
        findRoomById: findRoomById,
        updateRoom: updateRoom,
        deleteRoom: deleteRoom,
        findRoomsByUserId: findRoomsByUserId,
        findRoomsUserBelongs: findRoomsUserBelongs,
        updateRoomIssuesById: updateRoomIssuesById,
        searchByKeywords: searchByKeywords

    };
    return api;


    function searchByKeywords(keywords) {
      console.log("Here????")
      // issueModel.createIndex({
      //   title: "text",
      //   description: "text"
      // });

      var deferred = q.defer();

      RoomModel.find({$text: {$search: keywords}}, function(err, doc){
          if (err) {
              // reject promise if error
              deferred.reject(err);
              console.log("Room search error:" + err)

          } else {
              // resolve promise
              deferred.resolve(doc);
              console.log("Room search results:" + doc)
          }
      });
       // return a promise
       return deferred.promise;
    }


function updateRoomIssuesById(roomId, issueId){
  var deferred = q.defer();

        RoomModel.update({_id: roomId}, {$push: {"issues": issueId}}, {upsert:true}, function(err, doc){
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

    function findRoomsUserBelongs(userId){
        var deferred = q.defer();

      RoomModel.find({users: userId}, function(err, doc){
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

    function createRoomForUser(room, userId) {
      room.createdAt = (new Date()).getTime();
      room.userId = userId;

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

      RoomModel.findByIdAndUpdate(roomId, {$set: room}, {new:true, upsert:true}, function (err, doc) {
                  if (err) {
                        deferred.reject(err);
                  } else {
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
