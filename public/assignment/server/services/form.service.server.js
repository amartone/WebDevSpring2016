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

        userId = formModel.findFormsByUserId(userId)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );

    }

    function getFormById(req, res) {
        var formId = req.params.formId;

        formId = formModel.findFormById(formId)
            .then(
                function(doc){
                    res.json(doc);
                },

                function(err){
                    res.status(200).send(err);

                }
            );

    }

    function deleteForm(req, res) {
        var formId = req.params.formId;

        formId = formModel.deleteForm(formId)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(200).send(err);
                }
            );
    }

    function createFormForUser(req, res) {
        var userId = req.params.userId;
        var form = req.body;

        form = formModel.createFormForUser(form, userId)
            .then(
                function ( doc ) {
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }

    function updateForm(req, res) {
        var formId = req.params.formId;
        var form = req.body;

        form = formModel.updateForm(formId, form)
            .then(
                function ( doc ) {
                    console.log("Form updated...." + doc);
                    res.json(doc);
                },
                // send error if promise rejected
                function ( err ) {
                    res.status(400).send(err);
                }
            );
    }
};