/**
 * Created by Andrew on 3/15/16.
 */

var mock = require("./form.mock.json");
var q = require("q");

var formTemplate = require("./field.mock.json");

module.exports = function (db, mongoose) {

    var FieldSchema = require("./field.schema.server.js")(mongoose);
    var FormSchema = require("./form.schema.server.js")(mongoose);

    // create user model from schema
    var FormModel = mongoose.model('Form', FormSchema);

    var api = {
        createFormForUser: createFormForUser,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId,
        createField: createField,
        findFieldByFieldId: findFieldByFieldId,
        deleteField: deleteField,
        findFieldsByFormId: findFieldsByFormId,
        updateField: updateField
    };
    return api;


    function createFormForUser(form, userId) {
        var deferred = q.defer();

        newForm = {
            userId: userId,
            title: form.title,
            fields: formTemplate,
            created:(new Date()).getTime(),
            updated: (new Date()).getTime()
        };

        FormModel.create(newForm, function(err, doc){
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

    function findAllForms() {
        return mock;
    }

    function findFormById(formId) {
        var deferred = q.defer();

        FormModel.findById(formId, function(err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }

    function updateForm(formId, form) {
        var deferred = q.defer();

        form.updated = (new Date()).getTime();





        FormModel.findByIdAndUpdate(formId, {$set: form}, {new:true, upsert:true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log("Form updated in model: " + doc);
                deferred.resolve(doc);
            }
        });
        return deferred.promise;

    }

    function deleteForm(formId, form) {

        var deferred = q.defer();

        FormModel.remove({_id: formId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }



    function findFormByTitle(formTitle) {

        for (var f in mock) {
            if (mock[f].title === formTitle) {
                return mock[f];
            }
        }
        return null;
    }

    function findFormsByUserId(userId) {
        var deferred = q.defer();

        FormModel.find({userId: userId}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc);
            }
        });
        return deferred.promise;
    }


    function createField(formId, field) {

        var deferred = q.defer();

        FormModel.findByIdAndUpdate(formId, {$push: {fields: field}}, {new: true}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc)
            }
        });
        return deferred.promise;

    }

    function deleteField(formId, fieldId) {

        var deferred = q.defer();

        FormModel.update({_id: formId}, {$pull: {'fields': {_id: fieldId}}}, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc)
            }

        });
        return deferred.promise;
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
        var deferred = q.defer();

        FormModel.findById(formId, function (err, doc) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc.fields)
            }
        });
        return deferred.promise;
    }

    function updateField(formId, fieldId, field) {

        var deferred = q.defer();

        FormModel.update({_id: formId, "fields._id": fieldId}, {$set: {"fields.$": field}}, {new: true}, function (err, doc) {
                if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(doc.fields)
            }
        });
        return deferred.promise;
    }
};