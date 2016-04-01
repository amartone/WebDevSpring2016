/**
 * Created by Andrew on 3/18/16.
 */
var forms = require("./form.mock.json");
var q = require("q");

module.exports = function (uuid, formModel, db, mongoose) {


    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FormSchema = require("./form.schema.server.js")(mongoose);

    // create user model from schema
    var FieldModel = mongoose.model('Field', FieldSchema);
    var FormModel = mongoose.model('Form', FormSchema);


    var api = {
        createField: createField,
        findFieldByFieldId: findFieldByFieldId,
        deleteField: deleteField,
        findFieldsByFormId: findFieldsByFormId,
        updateField: updateField
    };

    return api;

    function createField(formId, field) {

        var deferred = q.defer();

        FormModel.update({_id: formId},{$set: {fields: fields}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;

    }

    function deleteField(formId, fieldId) {
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        for (field in fields) {
            if (fields[field]._id == fieldId) {
                fields.splice(field, 1);
            }
        }
    }

    function findFieldByFieldId(formId, fieldId) {

        var form = formModel.findFormById(formId);
        var fields = form.fields;


        for (field in fields) {
            if (fields[field]._id == fieldId) {
                return fields[field];
            }
        }
    }

    function findFieldsByFormId(formId) {
        var form = formModel.findFormById(formId);

        var deferred = q.defer();

        FormModel.find({_id: formId},'fields', function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("Getting fields from model: " + doc);
                deferred.resolve(doc)
            }
        });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {
        var form = formModel.findFormById(formId);
        var fields = form.fields;
        for (_field in fields) {
            if (fields[_field]._id == fieldId) {
                fields[_field] = field;
            }
        }
    }

};