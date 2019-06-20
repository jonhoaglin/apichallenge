Welcome to my first REST API!

This is a response to a coding challenge to write an API endpoint using any language of my choice.
The challenge was to create an API endpoint to serve some information from github.

I chose Javascript/Node.js, as an opportunity to also learn Node.
This project makes use of Express.js to simplify the API creation,
and sync-request to pull information from the github API.

=== USAGE ===

There are 2 main methods
  1. /followers/:id
      Will accept a github id/username, and return up to 5 followers,
      then recursively retrieves the followers for each, up to 3 levels deep.

  2. /repos/:id
      Will accept a github id/username, and return up to 3 repositories for that user,
      along with up to 3 stargazers for each.
      Also recurses to retrieve the repositories for each stargazer, up to 3 levels deep.
