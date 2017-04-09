var key = require('./../.env').apiKey; //imports the api key saved in the .env file
var githubRepos = function(username) {
        // loads data from github when a user
        return $.get('https://api.github.com/users/' + username + '/repos?access_token=' + key).then(function(response) {
                    // gets the contents in the repos id and sets the content to empty
                    $("#repos").html(" ");
                    console.log(response);
                    //This function now calculates the length of the response and if  length is greater than 0 Github Respositories is appended appends
                    if (response.length > 0) {
                        var description = " ";
                        $("#repos").append("<h1 id='repo-title'><span class='title'></span>Github Repositories</h1>");
                        //This function loops through each response and when the github username is found then moments.js is used to display when a repo was created and updated
                        $.each(response, function(index) {
                            var created = moment(this.created_at).format('MMMM Do YYYY, h a');
                            var updated = moment(this.updated_at).format('MMMM Do YYYY, h a');
                            if (this.description !== null) {
                                description = this.description;
                            }
                            $("#repos").append("<div class='col-md-12'>" + "<h1><a href='" + this.url + "'><span class='title'></span> " + this.name + "</a></h1>" + "<div class='col-md-12'>" + "<p>Created: " + created + "</p>" + "<p>Updated: " + updated + "</p>" + "</div>" + "<div class='col-md-12'>" + "<p>" + description + "</p>" + "</div>" +
                                "</div>");
                        })
                    }
                     else {
                        // This section of the code gets all the contents that are within the user id
                        $("#user").html("<h1 class='center'>USER NOT FOUND</h1>");
                        $.each(response, function(i)
                          {
                        }).fail(function(error) {
                        console.log(error.responseJSON.message);
                      }
                    )}
                  }
                )};
                    //This exports the githubRepos variable to be used by other elements.
                     exports.repoModule = githubRepos;
