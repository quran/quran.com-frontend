# quran.com
This is the project soon to be the quran.com facing site. This is built in
Reactjs + Redux + Expressjs + Webpack. It is isomorphic which is fancy speak
to say that the javascript is shared between both the server and the client.

[![Dependency Status](https://david-dm.org/quran/quran.com-frontend.svg)](https://david-dm.org/quran/quran.com-frontend)
[![Code Climate](https://codeclimate.com/github/quran/quran.com-frontend.png)](https://codeclimate.com/github/quran/quran.com-frontend)


### Getting started
If you hate reading then skip to the 'Lazy synopsis' sub-section. If you've got 5 minutes to spare, read this entire section.

#### Getting started -- Installation
Simply clone this repo, then run `npm install` to install all the required node_modules. You should be running a relatively recent version
of Node.js, around ~5.0. If you have an archaic version of Node.js installed and are dreading the prospect of upgrading, have no fear, `nvm`
will save you time and headache -- install it, then use it to manage your version: https://github.com/creationix/nvm

Next, in the local file `./development.env`, an env variable is defined `API_URL`. Make sure this is set to quran.com at port 3000, like this:
`API_URL=http://quran.com:3000`. You would generally point this to localhost:3000 if you were working on developing the API at the same time, but
since you most likely are not running the API on your local system, point it to our production instance of the API (quran.com:3000).

From there, you are ready to go!

#### Getting started -- Developing
Following installation (previous section), you can start the app by running `npm run dev` which will
run both the server and the client (webpack) to compile upon edits. Go to localhost:8001 in your browser, *not* 8000 (that is the express server).
Next, open the developer console in the browser and open something under ./src, say `./src/containers/Surah/index.js` for example, and have fun.
You don't need to reload the browser everytime you make a change that you want to see, it will get applied auto-magically (most of the time).
Use the `DEBUG` env var when runnning the server to see debug messages, here's a good example that I use personally to filter out the noise but see
everything else: `DEBUG='*,-babel,-express:*' npm run dev`.

#### Getting started -- Lazy synopsis

1. In the `./development.env` file, ensure that `API_URL` is set to quran.com at port 3000, i.e. `API_URL=http://quran.com:3000`
2. Run `npm install`
3. Run `npm run dev`


### Other interesting subjects

#### Making sure main.js is small
Follow: https://www.npmjs.com/package/webpack-bundle-size-analyzer
```
env NODE_ENV=development webpack --json > bundle-stats.json
subl bundle-stats.json #so that you can the output
analyze-bundle-size bundle-stats.json
```

#### Backend API
Currently lives at https://github.com/quran/quran.com-api. If for some reason you're interested in checking this out, note that
the db is private even though it's a sub-module in the parent API repo (the db directory, https://github.com/quran/quran.com-api-rails-db).
As a matter of policy we don't share the database, but if you're interested in something in particular we might be willing to dump tables
relating to that particular thing for you. Contact @sharabash for it, because sharing is caring.

#### How to contribute
Fork this repo, then create a PR for specific fixes, improvements, etc. Note that wrapping your
head around things like React and Redux takes time, but all you essentially need to know is javascript
and have a bit of determination. We trust that you will not plagiarize this project, it is at the end
of the day for the sake of Allah and we all have good intentions while working with this project,
but if you're doing something unique, then have at it. We do stress however that "stealing"
this is unacceptable (e.g. putting up a clone of the website but with ads).

#### Testing - SECTION DEPRECATED
This section is now deprecated because neither of these commands work. @mmahalwy, please share your knowledge...

```
# Run `npm run test:watch` to run the tests locally and watching. Otherwise use `npm run test` for CI level tests.
# We also have nightwatch function tests. You can install nightwatch globally and can run tests like this:
# `nightwatch --test tests/functional/specs/Index_spec.js`
```


