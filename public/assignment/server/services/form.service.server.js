/**
 * Created by Andrew on 3/15/16.
 */
module.exports = function (app, formModel) {
    app.get("/api/assignment/user/:userId/form", getFormsForUser);
    app.get("/api/assignment/form/:formId", getFormById);
    app.delete("/api/assignment/form/:formId", deleteForm);
    app.post("/api/assignment/user/:userId/form", createFormForUser);
    app.put("/api/assignment/form/:formId", updateForm);

    function getFormsForUser(req, res) {
        var userId = req.params.userId;
        res.json(formModel.findFormsByUserId(userId));
    }

    function getFormById(req, res) {
        var formId = req.params.formId;
        res.json(formModel.findFormById(formId));
    }

    function deleteForm(req, res) {
        var formId = req.params.formId;
        formModel.deleteForm(formId);
        res.send(200);
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;
        res.json(formModel.createFormForUser(form, userId));
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;
        res.json(formModel.updateForm(formId, form));
    }
};