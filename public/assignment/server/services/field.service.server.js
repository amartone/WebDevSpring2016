/**
 * Created by Andrew on 3/18/16.
 */
module.exports = function (app, formModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", addField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    function getFieldsForFormId(req, res) {

        var formId = req.params.formId;

        formId = formModel.findFieldsByFormId(formId)
            .then(
                function (doc){
                    console.log("Getting fields from server: " + doc);
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);

                }

            );
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(formModel.findField(formId, fieldId));
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;

        fieldId = formModel.deleteField(formId, fieldId)
            .then(function (doc){
            console.log("Deleting field from server: " + doc);
            res.json(doc);
        },
        function(err){
            res.status(400).send(err);

        }

    );
}



    function addField(req, res) {
        var field = req.body;
        var formId = req.params.formId;

        field = formModel.createField(formId, field)
            .then(
                function (doc){
                    console.log("Adding field from server: " + doc);
                    res.json(doc);
                },
                function(err){
                    res.status(400).send(err);

                }


            );
    }

    function updateFieldById(req, res) {
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        var field = req.body;
        res.json(formModel.updateField(formId, fieldId, field));
    }
};