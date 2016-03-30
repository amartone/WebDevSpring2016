module.exports = function (app, searchModel) {
    app.get("/api/project/search", searchByKeywords);

    function searchByKeywords(req, res) {
        var keywords = req.query.keywords;

        console.log(keywords);
        res.json(searchModel.searchByKeywords(keywords));
    }


};