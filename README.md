
# Quran.com

This is the project soon to be the Quran.com facing site. This is built in
[Reactjs] + [Redux] + [Expressjs] + [Webpack]. It is isomorphic (javascript shared
between both the server and the client) for SEO reasons.

[![Stories Ready](https://badge.waffle.io/quran/quran.com-frontend.svg?label=ready&title=Ready)](http://waffle.io/quran/quran.com-frontend)
[![Stories In Progress](https://badge.waffle.io/quran/quran.com-frontend.svg?label=in%20progress&title=In%20Progress)](http://waffle.io/quran/quran.com-frontend)
[![Stories In Review](https://badge.waffle.io/quran/quran.com-frontend.svg?label=in%20review&title=In%20Review)](http://waffle.io/quran/quran.com-frontend)


[![Dependency Status](https://david-dm.org/quran/quran.com-frontend.svg)](https://david-dm.org/quran/quran.com-frontend) [![devDependency Status](https://david-dm.org/quran/quran.com-frontend/dev-status.svg)](https://david-dm.org/quran/quran.com-frontend#info=devDependencies)
[![Code Climate](https://codeclimate.com/github/quran/quran.com-frontend.png)](https://codeclimate.com/github/quran/quran.com-frontend)

## How to contribute
We trust that you will not copy this idea/project, this is at the end for the sake of Allah and we all have good intentions while working with this project. But We must stress that copying the code/project is unacceptable.

Read the [contributing] section before creating an issue.

## Server-Side Integration
Unless you have the backend API running locally, you will need to update the `API_URL`, in `development.env` file, from `localhost` to `api.quran.com`. Leave the port number same.

To start the app, run `npm run dev` which will run both the server and the client (webpack) to compile upon edits. Go to http://localhost:8001 in your browser, not 8000 (that is just the express server).


## Backend
Current at: https://github.com/quran/quran-api-rails
DB is private, message me for access.


## Design
We currently use InvisionApp. Again, contact me if you'd like access to it.

## Making sure main.js is small
Follow: https://www.npmjs.com/package/webpack-bundle-size-analyzer
```
env NODE_ENV=development webpack --json > bundle-stats.json
subl bundle-stats.json #so that you can the output
analyze-bundle-size bundle-stats.json
```

## [View project issues on waffle.io...](https://waffle.io/quran/quran.com-frontend)

[Reactjs]: https://facebook.github.io/react/docs/getting-started.html
[Redux]: http://redux.js.org/
[Expressjs]: http://expressjs.com/en/starter/hello-world.html
[Webpack]: http://webpack.github.io/docs/what-is-webpack.html
[contributing]: CONTRIBUTING.md
