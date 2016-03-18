/**
 * Created by Andrew on 3/15/16.
 */
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FormService", formService);

    function formService($http) {
        var api = {
            createFormForUser: createFormForUser,
            findAllFormsForUser: findAllFormsForUser,
            deleteFormById: deleteFormById,
            updateFormById: updateFormById
        };
        return api;

        function createFormForUser(userId, form) {
            return $http.post("/api/assignment/user/" + userId + "/form", form);
        }

        function findAllFormsForUser(userId) {
            return $http.get("/api/assignment/user/" + userId + "/form")
        }

        function deleteFormById(formId, form) {
            return $http.delete("/api/assignment/form/" + formId, form);
        }

        function updateFormById(formId, form) {
            return $http.put("/api/assignment/form/" + formId, form);
        }

    }

})();