02/21/2022 - Mon
- Generated an empty Nx workspace for Trivia Nation. Since our effort will encompass Express and
  Angular development along with automated testing I have learned from experience that Nx eases
  certain friction points inherent in developing a moderately-complex application with a
  fully-remote team. Generated using `npx create-nx-workspace@latest --preset=empty`.
- I needed to add Angular and Express Nx plugins so that I can generate skeleton apps later.
  Executed `npm install -D @nrwl/angular` and `npm install -D @nrwl/express` in the workspace.
- Generated an Angular client skeleton app called `tn-client`. Executed `nx generate
  @nrwl/angular:application --name=tn-client --style=scss --e2eTestRunner=none --prefix=app
  --routing`.
- Generated an Express server skeleton app called `tn-server`. Executed `nx generate
  @nrwl/express:application --name=tn-server`.
- Added a couple files to get "production" server bootstrapping and postgres sql under version
  control.
- Added a HOWTO.md at the workspace root to quickly bring the rest of the team up to speed.
- Added forever and nodemon plugins for bootstrapping the "production" server.
02/22/2022 - Tue
- Provided some advice to the group about the workspace, including a link to a fairly well-known
  Angular tutorial (Heroes App) provided by Google.
- Made a Component Hierarchy document that spells out the components I think need to be made to
  realize the mockups Cara provided earlier in the day.
02/23/2022 - Wed
- Discussed using Sqlite instead of Postgres with the group. I simply did not want to get postgres
  or docker-running-postgres on each group member's machine, nor did I want to hardcode a postgres
  user password in the repository.
- I created a user table, and provided a singleton connector class to sqlite. There's a dummy
  teacher account, and passwords are hashed with argon2.
- I added some sample code in tn-server to demonstrate creating an API endpoint and querying the
  database.
- Included Joi data validation framework. It was a strategic decision, since the rest of my group
  is seeing Angular for the first time I want to keep them focused on the fundamentals and away from
  defensive coding on the API side.
02/24/2022 - Thu
- I re-organized tn-server and tn-client to make the overall app easier to deploy and test. The
  HOWTO has been updated with instructions on how to build and where to reach the app.
02/27/2022 - Sun
- I completed the development environment ticket. I had to adjust the routes of the development
  version of the app to reflect where it is served on my Linode host.
