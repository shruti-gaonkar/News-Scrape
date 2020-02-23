$(document).ready(function () {
    $('.modal').modal({
        onOpenStart: function (modal, trigger) {
            $(modal).find('#article_id').val($(trigger).data('id'));
            $(modal).find('#Note').val('');

            $.getJSON("/api/articles/" + $(trigger).data('id'), function (data) {
                let newDiv = $("<div>");
                $.each(data[0].note, function (i, val) {
                    newDiv.append("<li class='collection-item'>" + val.body + "</li>");
                });
                $(modal).find('#note_list').html(newDiv);
            });
        }
    });
});

$(document).on("click", ".scrape-new", getArticles);
$(document).on("click", "#btn_clear", clearArticles);
$(document).on("click", "#btn_save_article", saveArticle);
$(document).on("click", "#btn_save_note", saveNote);

// Grab the articles as a json
function getArticles() {
    $.getJSON("/scrape", function (data) {
    }).then(function () {
        window.location.reload();
    });
}

function saveArticle() {
    const id = $(this).attr('data-id');
    $.ajax({
        method: "PUT",
        url: "/api/update/articles",
        data: {
            saved: true,
            _id: id
        }
    })
        .then(function () {
            $("#news_" + id).remove();
        });
}

function saveNote() {
    const id = $("#article_id").val();
    const note = $("#Note").val();
    if (note) {
        $.ajax({
            method: "POST",
            url: "/api/articles/" + id,
            data: {
                body: $("#Note").val()
            }
        })
            .then(function () {
                $('#notemodal').modal('close');
            });
    } else {
        $(".error-msg").text("Please enter a note");
    }

}

function clearArticles() {
    $.ajax({
        method: "DELETE",
        url: "/api/delete/articles"
    })
        .then(function (data) {
            $("#article_container").empty();
            $("#no_article_container").show();
        });
}