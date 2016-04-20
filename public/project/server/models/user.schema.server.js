module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var UserSchema = mongoose.Schema({
        userId: String,
        registeredOn: String,
        firstName: String,
        lastName: String,
        username: String,
        password: String,
        role: String,
        photo: String,
        rooms: [String]

    }, {collection: 'project.user'});

    UserSchema.index({

      firstName: "text",
      lastName: "text",
      usermame: "text",
      role: "text"

    })
    return UserSchema;
};
