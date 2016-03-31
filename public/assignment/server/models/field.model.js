/**
 * Created by Andrew on 3/18/16.
 */
var forms = require("./form.mock.json");
module.exports = function (uuid, formModel, db, mongoose) {


    var FieldSchema = require("./field.schema.server.js")(mongoose);

    // create user model from schema
    var FieldModel = mongoose.model('Field', FieldSchema);

    var api = {
        createField: createField,
        findFieldByFieldId: findFieldByFieldId,
        deleteField: deleteField,
        findFieldsByFormId: findFieldsByFormId,
        updateField: updateField
    };

    return api;

    function createField(formId, field) {
        var form = formModel.findFormById(formId);
        console.log(formId);
        field._id = uuid.v1();
        form.fields.push(field);
        return (field);
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
        return form.fields;
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