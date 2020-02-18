const db = require("../models");
const express = require("express");
const router = express.Router();
// Our scraping tools
// Axios is a promised-based http library, similar to jQuery's Ajax method
// It works on the client and on the server
const axios = require("axios");
const cheerio = require("cheerio");

router.get("/scrape", function (res, req) {
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
            //console.log($(element).parent().parent().find(".photo-wrapper").children("a").children("img").attr('src'));
            if (title && link) {
                result.push({
                    title: title,
                    link: link,
                    desc: desc,
                    byline: byline,
                    image: image
                });
            }
        });

        if (result) {
            console.log(result);
            //res.json(result);
        }


        //res.send('Birds home page')
    });
});

module.exports = router;
