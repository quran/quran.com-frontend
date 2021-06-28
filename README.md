# Quran.com [Join Quran.com community](https://quran-community.herokuapp.com/)

This project is the frontend for Quran.com. It is built using
[Reactjs] + [Redux] + [Expressjs] + [Webpack]. It is isomorphic (javascript shared
between both the server and the client) for SEO reasons.

[![Code Climate](https://codeclimate.com/github/quran/quran.com-frontend.png)](https://codeclimate.com/github/quran/quran.com-frontend)

## How to contribute
We trust that you will not copy this idea/project, this is at the end for the sake of Allah and we all have good intentions while working with this project. But we must stress that copying the code/project is unacceptable.

Read the [contributing] section before creating an issue.

## Running the app locally
- Ensure you have [nodejs] installed
- Get the source by running `git clone https://github.com/quran/quran.com-frontend/` or creating a [fork]
- Run `npm install` to do first time installation of all dependencies
- Run `npm run dev` to start the dev server. Make sure you have pm2 installed globally! `npm install -g pm2`
- Open `http://localhost:8000` in your browser to see the app.

## Staging
To see the app with the latest changes, see the [staging] site. Production releases are made periodically when staging is stable and well tested.

## Backend
The API source is at https://github.com/quran/quran-api-rails

DB is private, message @mmahalwy for access.

The dev server uses the staging API by default. If you want to use a local API server, follow the instructions in the API repo and run the server locally then update the API_URL field in app.json to point to the local address.

## Quran.com community
Join quran.com community here https://quran-community.herokuapp.com/

## Design
We currently use InvisionApp. Again, contact me if you'd like access to it.

## Making sure main.js is small
Follow: https://www.npmjs.com/package/webpack-bundle-size-analyzer
```
env NODE_ENV=development webpack --json > bundle-stats.json
subl bundle-stats.json #so that you can the output
analyze-bundle-size bundle-stats.json
```

[Reactjs]: https://facebook.github.io/react/docs/getting-started.html
[Redux]: http://redux.js.org/
[Expressjs]: http://expressjs.com/en/starter/hello-world.html
[Webpack]: http://webpack.github.io/docs/what-is-webpack.html
[nodejs]: https://nodejs.org/en/
[contributing]: CONTRIBUTING.md
[fork]: https://help.github.com/articles/fork-a-repo/
[staging]: https://staging.quran.com
