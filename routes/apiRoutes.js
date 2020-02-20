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


// delete the articles
router.delete("/api/delete/articles", function (req, res) {
    db.Article.deleteMany()
        .then(result => console.log(`Deleted ${result.deletedCount} item(s).`))
        .catch(err => console.error(`Delete failed with error: ${err}`))
});

module.exports = router;
