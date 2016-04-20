module.exports = function (app, issueModel, roomModel, userModel) {
    app.get("/api/project/search/issues", searchByKeywordsInIssues);
    app.get("/api/project/search/rooms", searchByKeywordsInRooms);
    app.get("/api/project/search/users", searchByKeywordsInUsers);



    function searchByKeywordsInIssues(req, res) {
        var keywords = req.query.keywords;

        issueModel.searchByKeywords(keywords)
                   .then(
                       function ( doc ) {
                           res.json(doc);
                       },
                       // send error if promise rejected
                       function ( err ) {
                           res.status(400).send(err);
                       });
     }


     function searchByKeywordsInRooms(req, res) {
         var keywords = req.query.keywords;
         console.log("Searching rooms from service")
         roomModel.searchByKeywords(keywords)
                    .then(
                        function ( doc ) {
                            res.json(doc);
                        },
                        // send error if promise rejected
                        function ( err ) {
                            res.status(400).send(err);
                        });
      }


      function searchByKeywordsInUsers(req, res) {
          var keywords = req.query.keywords;

          userModel.searchByKeywords(keywords)
                     .then(
                         function ( doc ) {
                             res.json(doc);
                         },
                         // send error if promise rejected
                         function ( err ) {
                             res.status(400).send(err);
                         });
       }



    };
