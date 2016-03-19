"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .factory("FieldService", FieldService);

    function FieldService ($http) {

        var api = {
            createFieldForForm: createFieldForForm,
            getFieldForForm: getFieldForForm,
            getFieldsForForm: getFieldsForForm,
            deleteFieldFromForm: deleteFieldFromForm,
            updateField: updateField
        };

        return api;

        function createFieldForForm (formId, field) {
            return $http.post("/api/assignment/form/" + formId + "/field", field);
        }

        function getFieldForForm (formId, fieldId) {
            return $http.get("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function getFieldsForForm (formId) {
            return $http.get("/api/assignment/form/" + formId + "/field")
        }

        function deleteFieldFromForm (formId, fieldId) {
            return $http.delete("/api/assignment/form/" + formId + "/field/" + fieldId);
        }

        function updateField (formId, fieldId, field) {
            return $http.put("/api/assignment/form/" + formId + "/field/" + fieldId, field);
        }

    }
})();