
var githubRepos = require('./../js/backend.js').repoModule; //imports the backend js properties

$('.message a').click(function () {// This function animates the form
    $('form').animate({
        height: "toggle"
        , opacity: "toggle"
    }, "slow");
});

$(function () {
    $("#results").hide();
    $("#search").submit(function (event) {
        event.preventDefault();
        var username = $("#input").val(); //Collects what the user inputs in the form
        $("#results").hide(function () {
            //Use a promise to prevent fading conflicts
            githubRepos(username).then(function () {
                $("#results").show();
            });
        });
    });
});
