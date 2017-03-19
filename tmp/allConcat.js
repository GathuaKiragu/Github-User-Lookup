$('.message a').click(function () {
    $('form').animate({
        height: "toggle"
        , opacity: "toggle"
    }, "slow");
});
var githubRepos = require('./../js/backend.js').repoModule;
$(function () {
    $("#results").hide();
    $("#search").submit(function (event) {
        event.preventDefault();
        var username = $("#input").val();
        $("#results").hide(function () {
            //Use a promise to prevent fading conflicts
            githubRepos(username).then(function () {
                $("#results").show();
            });
        });
    });
});