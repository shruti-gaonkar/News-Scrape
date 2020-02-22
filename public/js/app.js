$(document).ready(function () {
    $('.modal').modal({
        onOpenStart: function (modal, trigger) {
            $(modal).find('#article_id').val($(trigger).data('id'))
        }
    });
});

$(document).on("click", "#btn_scrape", getArticles);
$(document).on("click", "#btn_clear", clearArticles);
$(document).on("click", "#btn_save_article", saveArticle);
$(document).on("click", "#btn_save_note", saveNote);


// Grab the articles as a json
function getArticles() {
    $.getJSON("/scrape", function (data) {
        console.log(data);
    }).then(function () {
        $.getJSON("/", function (data) {

        });
    });
}

//$.getJSON("/articles", function (data) {

//});
function saveArticle() {
    const id = $(this).attr('data-id');
    //console.log(id);
    $.ajax({
        method: "PUT",
        url: "/api/update/articles",
        data: {
            saved: true,
            _id: id
        }
    })
        .then(function () {
            //window.location.reload();
            console.log("Updated Successfully");
            $("#news_" + id).remove();
        });
}

function saveNote() {
    const id = $("#article_id").val();
    //console.log(id);
    $.ajax({
        method: "POST",
        url: "/api/articles/" + id,
        data: {
            body: $("#Note").val()
        }
    })
        .then(function () {
            //window.location.reload();
            console.log("Note created Successfully");
        });
}

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