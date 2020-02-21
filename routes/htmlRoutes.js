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
    db.Article.find({}).lean().exec(function (err, dbArticle) {
        if (err) throw err;
        res.render("index", {
            contents: dbArticle
        });
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
