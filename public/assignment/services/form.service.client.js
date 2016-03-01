/**
 * Created by Andrew on 2/29/16.
 */
(function() {
    angular
        .module("FormBuilderApp")
        .factory("FormService", FormService);

    function FormService() {
        var model = {
            forms: [
                {"_id": "000", "title": "Contacts", "userId": 123},
                {"_id": "010", "title": "ToDo", "userId": 123},
                {"_id": "020", "title": "CDs", "userId": 234}
            ]
            ,
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return model;

        function createFormForUser(userId, form, callback) {
            var form = {
                _id: (new Date).getTime(),
                title: form.title,
                userId: userId
            };
            model.forms.push(form);
            callback(form);
        }

        function findAllFormsForUser(userId, callback) {
            var listOfForms = [];
            for (var form in model.forms) {
                if (model.forms[form].userId === userId) {
                    listOfForms.push(model.forms[form]);
                }
            }
            callback(listOfForms);

        }

        function deleteFormById(formId, callback) {
            for (var form in model.forms) {
                if (model.forms[form]._id === formId) {
                    model.forms.splice(form, 1);
                }
                callback(model.forms);
            }
        }

        function updateFormById(formId, newForm, callback) {
            for (var form in model.forms) {

                if (model.forms[form]._id === formId) {
                    model.forms[form].title = newForm.title;
                    callback(model.forms[form]);
                }
            }
        }
    }
})();