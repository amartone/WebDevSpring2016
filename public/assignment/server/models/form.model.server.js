/**
 * Created by Andrew on 3/15/16.
 */

var mock = require("./form.mock.json");
module.exports = function () {

    var api = {
        createFormForUser: createFormForUser,
        findAllForms: findAllForms,
        findFormById: findFormById,
        updateForm: updateForm,
        deleteForm: deleteForm,
        findFormByTitle: findFormByTitle,
        findFormsByUserId: findFormsByUserId
    };
    return api;


    function createFormForUser(form, userId) {
        form._id = "ID_" + (new Date()).getTime();
        form.userId = userId;

        mock.push(form);
        return form;
    }

    function findAllForms() {
        return mock;
    }

    function findFormById(formId) {
        for (u in mock) {
            if (mock[u]._id === formId) {
                return mock[u];
            }
        }
        return null;

    }

    function updateForm(formId, form) {
        console.log(formId);
        for (var u in mock) {
            if (mock[u]._id == formId) {
                mock[u].username = form.username;
                mock[u].firstName = form.firstName;
                mock[u].lastName = form.lastName;
                mock[u].password = form.password;
                return mock[u];
            }
        }
    }

    function deleteForm(formId, form) {
        for (var u in mock) {
            if (mock[u]._id === formId) {
                mock.splice(form, 1);
            }
        }
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
        var listOfForms = [];
        for (var f in mock) {
            if (mock[f].userId == userId) {
                listOfForms.push(mock[f]);
            }
        }
        return listOfForms;
    }

}