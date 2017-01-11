# Quran.com

This project is the frontend for Quran.com. It is built using
[Reactjs] + [Redux] + [Expressjs] + [Webpack]. It is isomorphic (javascript shared
between both the server and the client) for SEO reasons.

[![Stories Ready](https://badge.waffle.io/quran/quran.com-frontend.svg?label=ready&title=Ready)](http://waffle.io/quran/quran.com-frontend)
[![Stories In Progress](https://badge.waffle.io/quran/quran.com-frontend.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/quran/quran.com-frontend)
[![Stories In Review](https://badge.waffle.io/quran/quran.com-frontend.svg?label=in%20review&title=In%20Review)](http://waffle.io/quran/quran.com-frontend)

[![Dependency Status](https://david-dm.org/quran/quran.com-frontend.svg)](https://david-dm.org/quran/quran.com-frontend) [![devDependency Status](https://david-dm.org/quran/quran.com-frontend/dev-status.svg)](https://david-dm.org/quran/quran.com-frontend#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/quran/quran.com-frontend.png)](https://codeclimate.com/github/quran/quran.com-frontend)

## How to contribute
We trust that you will not copy this idea/project, this is at the end for the sake of Allah and we all have good intentions while working with this project. But we must stress that copying the code/project is unacceptable.

Read the [contributing] section before creating an issue.

## Running the app locally
- Ensure you have [nodejs] installed
- Get the source by running `git clone https://github.com/quran/quran.com-frontend/` or creating a [fork]
- Run `npm install` to do first time installation of all dependencies
- Run `npm run dev` to start the dev server
- Open `http://localhost:8000` in your browser to see the app.

## Backend
The API source is at https://github.com/quran/quran-api-rails

DB is private, message @mmahalwy for access.

The dev server uses the staging API by default. If you want to use a local API server, follow the instructions in the API repo and run the server locally then update the API_URL field in app.json to point to the local address.

## Slack
Signup at https://quranslack.herokuapp.com to be added to the Slack group

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
