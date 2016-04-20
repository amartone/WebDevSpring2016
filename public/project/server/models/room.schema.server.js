module.exports = function(mongoose) {



    // use mongoose to declare a user schema
    var RoomSchema = mongoose.Schema({
        userId: String,
        title: String,
        issues: [String],
        createdAt: String,
        users: [String],
        photo: String

    }, {collection: 'project.room'});

    RoomSchema.index({
      title: "text",
      users: "text"


    })
    return RoomSchema;
};
