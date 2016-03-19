/**
 * Created by Andrew on 3/18/16.
 */
module.exports = function (app, formModel, fieldModel) {
    app.get("/api/assignment/form/:formId/field", getFieldsForFormId);
    app.get("/api/assignment/form/:formId/field/:fieldId", getFieldById);
    app.delete("/api/assignment/form/:formId/field/:fieldId", deleteFieldById);
    app.post("/api/assignment/form/:formId/field", addField);
    app.put("/api/assignment/form/:formId/field/:fieldId", updateFieldById);

    function getFieldsForFormId(req, res) {
        var formId = req.params.formId;
        res.json(fieldModel.findFieldsByFormId(formId));
    }

    function getFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        res.json(fieldModel.findField(formId, fieldId));
    }

    function deleteFieldById(req, res) {
        var formId = req.params.formId;
        var fieldId = req.params.fieldId;
        fieldModel.deleteField(formId, fieldId);
        res.send(200);
    }

    function addField(req, res) {
        var field = req.body;
        var formId = req.params.formId;
        res.json(fieldModel.createField(formId, field));
    }

    function updateFieldById(req, res) {
        var fieldId = req.params.fieldId;
        var formId = req.params.formId;
        var field = req.body;
        res.json(fieldModel.updateField(formId, fieldId, field));
    }
};