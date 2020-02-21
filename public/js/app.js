$(document).on("click", "#btn_scrape", getArticles);
$(document).on("click", "#btn_clear", clearArticles);

// Grab the articles as a json
function getArticles() {
    $.getJSON("/scrape", function (data) {
        console.log(data);
    }).then(function () {
        $.getJSON("/articles", function (data) {

        });
    });
}

//$.getJSON("/articles", function (data) {

//});


function clearArticles() {
    $.ajax({
        method: "DELETE",
        url: "/api/delete/articles"
    })
        .then(function () {
            //window.location.reload();
            console.log("Deleted Successfully");
        });
}