/**
 * Created by Andrew on 2/23/16.
 */
(function(){
    angular
        .module("FormBuilderApp")
        .controller("FormController", FormController);

    function FormController(FormService, $rootScope) {

        var vm = this;

        vm.addForm = addForm;
        vm.updateForm = updateForm;
        vm.deleteForm = deleteForm;
        vm.selectForm = selectForm;
        vm.form = null;
        vm.forms = [];

        function showForms() {
            FormService.findAllFormsForUser($rootScope.currentUser._id)
                .then(function(response){
                    if(response.data) {
                        console.log(response.data);
                        vm.forms = response.data;
                    }
                });
        }
        showForms();

        function addForm(form) {
            FormService.createFormForUser($rootScope.currentUser._id, form)
                .then(function(response){
                   if(response.data){
                       console.log(response.data);
                       vm.forms.push(response.data);
                       //showForms();
                   }
                });
        }

        function updateForm(form){
            FormService.updateFormById(form._id, form)
                .then(function(response) {
                    if(response.data){
                        console.log(response.data);
                        delete vm.form;

                        //vm.forms = response.data;
                        //showForms();
                    }
                });
            //delete $scope.form;
        }
        function selectForm(formIndex){
            //Select the form
            vm.form = vm.forms[formIndex];
        }

        function deleteForm(formIndex){
            var formId = vm.forms[formIndex]._id;
            //Delete the selected form
            FormService.deleteFormById(formId)
                .then(function(response){
                    console.log("Deleted form.");
                    vm.forms.splice(formIndex, 1);
                    //showForms();
                });
        }
    }
})();