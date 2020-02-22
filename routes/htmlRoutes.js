const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    /*db.Article.find({},{ lean: false }).then(function (dbArticle) {
        //console.log(dbArticle);
        res.render("index", {
            contents: dbArticle
        });
        //res.json(dbArticle)
    }).catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
    });*/
    db.Article.find({ "saved": false }).lean().exec(function (err, dbArticle) {
        if (err) throw err;
        res.render("index", {
            contents: dbArticle
        });
    });
});

router.get("/saved", function (req, res) {
    db.Article.find({ "saved": true }).lean().exec(function (err, dbArticle) {
        if (err) throw err;
        res.render("index", {
            contents: dbArticle
        });
    });
});

/*router.get("/api/articles/:id", function (req, res) {
    db.Article.find({ "_id": req.params.id }).lean().exec(function (err, dbNote) {
        if (err) throw err;
        res.render("partials/note/note-list-block", {
            contents: dbNote
        });
    });
});*/
// Route for grabbing a specific Article by id, populate it with it's note
router.get("/api/articles/:id", function (req, res) {
    // Using the id passed in the id parameter, prepare a query that finds the matching one in our db...
    db.Article.find({ _id: req.params.id })
        // ..and populate all of the notes associated with it
        .populate("note")
        .then(function (dbArticle) {
            // If we were able to successfully find an Article with the given id, send it back to the client
            res.json(dbArticle);
            /*return res.render("partials/note/note-list-block", {
                note_contents: "sdsds"
            });*/
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
});

/*router.get("/articles", function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
        //console.log(dbArticle);
        res.render("index", { dbArticle: dbArticle });
    }).catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
    });
});*/



module.exports = router;
