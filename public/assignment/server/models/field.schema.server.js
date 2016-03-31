module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var FieldSchema = mongoose.Schema({
        label: String,
        type: String,
        placeholder: String,
        options: [{label: String, options: String}]
    }, {collection: 'assignment.field'});
    return FieldSchema;
};

