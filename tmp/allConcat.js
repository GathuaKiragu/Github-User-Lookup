//imports the backend js properties
var githubRepos = require('./../js/backend.js').repoModule;

// This function animates the form
$('.message a').click(function () {
    $('form').animate({
        height: "toggle"
        , opacity: "toggle"
    }, "slow");
});

//Collects what the user inputs in the form
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
