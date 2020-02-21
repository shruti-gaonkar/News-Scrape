const db = require("../models");
const express = require("express");
const router = express.Router();
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/scrape", function (req, res) {
    axios.get("https://www.washingtonpost.com/").then(function (response) {
        // Then, we load that into cheerio and save it to $ for a shorthand selector
        const $ = cheerio.load(response.data);

        let result = [];
        $(".headline").each(function (i, element) {
            const title = $(element).text();
            const link = $(element).children("a").attr("href");
            const desc = $(element).next().find(".blurb").text();
            const byline = $(element).next().find(".byline").text();
            const image = $(element).parent().parent().find(".photo-wrapper").children("a").children("img").attr('data-low-res-src');
            if (title && link) {
                result.push({
                    headline: title,
                    link: link,
                    summary: desc,
                    byline: byline,
                    image: image
                });
            }
        });

        if (result) {
            db.Article.insertMany(result, { ordered: false }).then(function (dbArticle) {
                // View the added result in the console
                //console.log(dbArticle);
            })
                .catch(function (err) {
                    // If an error occurred, log it
                    console.log(err);
                });
        }

        res.send("Scrape Complete");
    });
});

router.put("/api/update/articles", function (req, res) {
    console.log(req.body);
    db.Article.findOneAndUpdate(
        // the id of the item to find
        { _id: req.body._id },

        // the change to be made. Mongoose will smartly combine your existing 
        // document with this change, which allows for partial updates too
        { $set: { saved: req.body.saved } },

        // an option that asks mongoose to return the updated version 
        // of the document instead of the pre-updated one.
        { new: true },

        // the callback function
        (err, doc) => {
            // Handle any possible database errors
            if (err) return res.status(500).send(err);
            return res.send(doc);
        }
    )
});


// delete the articles
router.delete("/api/delete/articles", function (req, res) {
    db.Article.deleteMany()
        .then(result => console.log(`Deleted ${result.deletedCount} item(s).`))
        .catch(err => console.error(`Delete failed with error: ${err}`))
});

module.exports = router;
