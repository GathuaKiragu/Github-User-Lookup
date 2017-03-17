$(document).ready(function () {
    $('#submit').click(function (event) {
        event.preventDefault();
        var gitHubName = $('#username').val();
        $('#username').val("");
        $('#solution').text("Your Github UserName Is " + gitHubName + ".");
    });
});