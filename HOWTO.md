# How to get Trivia Nation running on your own machine
- In separate terminals with this workspace as the working directory, execute:
  * `nx serve tn-server`
  * `nx build tn-client --watch`
- Each terminal will watch for any changes made to the applications and automatically rebuild the application
- Angular client can be reached at http://localhost:3333/trivia-nation
- Express API can be reached at http://localhost:3333/trivia-nation/api