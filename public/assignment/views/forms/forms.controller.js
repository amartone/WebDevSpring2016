/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $scope, $rootScope) {
        $scope.addForm = addForm;
        $scope.updateForm = updateForm;
        $scope.deleteForm = deleteForm;
        $scope.selectForm = selectForm;

        function showForms() {
            var callback = function(response){
                $scope.forms = response;
                console.log($scope.forms);
            };

            FormService.findAllFormsForUser($rootScope.currentUser._id, callback);
        }

        showForms();

        function addForm(form) {
            FormService.createFormForUser($rootScope.currentUser._id, form, showForms);
        }

        function updateForm(form){
            FormService.updateFormById(form._id, form, showForms);
            delete $scope.form;
        }

        function selectForm(formIndex){
            //Select the form
            $scope.form = $scope.forms[formIndex];
        }

        function deleteForm(form){
            //Delete the selected form
            FormService.deleteFormById(form._id, showForms);
        }
    }
})();