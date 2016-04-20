module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var IssueSchema = mongoose.Schema({
        userId: String,
        roomId: String,
        title: String,
        priority: String,
        description: String,
        assignee: String,
        created: String,
        updated: String,
        image: String,

    }, {collection: 'project.issue'});

    IssueSchema.index({
      title: "text",
      descriptiun: "text"
    });

    return IssueSchema;
};
