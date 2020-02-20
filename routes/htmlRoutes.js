const db = require("../models");
const express = require("express");
const router = express.Router();

router.get("/", function (req, res) {
    return res.render("index");
});

router.get("/articles", function (req, res) {
    db.Article.find({}).then(function (dbArticle) {
        console.log(dbArticle);
        return res.render("index", { data: dbArticle });
    }).catch(function (err) {
        // If an error occurred, send it to the client
        res.json(err);
    });
});

router.get("/note", function (req, res) {
    res.render("note");
});

module.exports = router;
