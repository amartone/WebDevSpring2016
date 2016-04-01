/**
 * Created by Andrew on 2/23/16.
 */

"use strict";
(function () {
    angular
        .module("FormBuilderApp")
        .controller("FieldController", FieldController);

    function FieldController(FieldService, FormService, $routeParams) {
        var vm = this;
        var formId = null;
        vm.edit_field = null;
        vm.editField = editField;
        vm.confirmEdit = confirmEdit;
        vm.deleteField = deleteField;
        vm.addField = addField;

        vm.options =
            [
                'Single Line Text Field',
                'Multi Line Text Field',
                'Date Field',
                'Dropdown Field',
                'Checkboxes Field',
                'Radio Buttons Field'
            ];

        if ($routeParams.formId) {
            formId = $routeParams.formId;
        }

        function init() {
            FieldService
                .getFieldsForForm(formId)
                .then(function (response) {
                    console.log("Controller has fields" + response.data);
                    vm.fields = response.data;

                });
            //FormService
            //    .findFormById(formId)
            //    .then(function (response) {
            //        vm.form = response.data;
            //    });
        }

        init();

        function deleteField(field) {
            vm.cField = null;
            FieldService
                .deleteFieldFromForm(formId, field._id)
                .then(init);
        }

        function addField(fieldType) {
            var field = {
                "label": "",
                "type": fieldType,
                "placeholder": "",
                "options": null
            };

            FieldService
                .createFieldForForm(formId, field)
                .then(function (response) {
                    if (response.data) {
                        init();
                    }
                });
        }

        function editField(field) {
            vm.edit_field = field;
            if (vm.edit_field.type == 'OPTIONS' || 'RADIOS' || 'CHECKBOXES') {
                var fieldOptions = [];
                var options = vm.edit_field.options;
                for (var opt in options) {
                    fieldOptions.push(options[opt].label + ":" + options[opt].value)
                }
                vm.optionTextList = fieldOptions.join("\n");
            }
        }

        function confirmEdit(field) {
            if (field.type == 'OPTIONS' || 'RADIOS' || 'CHECKBOXES') {
                var optionArray = [];
                var option_text = vm.optionTextList;
                for (var opt in option_text) {
                    var o = option_text[opt].split(":");
                    optionArray.push({
                        label: o[0],
                        value: o[1]
                    });
                }
                field.options = optionArray;
            }
            FieldService
                .updateField(formId, field._id, field)
                .then(init);
            vm.edit_field = null;

        }
    }
})();