# Contributing

You want to help? You rock! Now, take a moment to be sure your contributions make sense to everyone else.

## Reporting Issues

Found a problem? Want a new feature?

- See if your issue or idea has [already been reported].


## Submitting Pull Requests

Pull requests are the greatest contributions, so be sure they are focused in scope, and do avoid unrelated commits.

1. To begin, [fork this project], clone your fork, and add our [upstream].
	```bash
	# Clone your fork of the repository into the current directory
	git clone https://github.com/<your-username>/quran.com-frontend
	# Navigate to the newly cloned directory
	cd quran.com-frontend
	#Assign the forked repository to a remote call "origin"
	git remote add origin git://github.com/<your-username>/quran.com-frontend.git
	# Assign the original repository to a remote called "upstream"
	git remote add upstream https://github.com/quran/quran.com-frontend
	# Install the tools necessary for development
	npm install
	```

2. Create a branch for your feature or fix:
	```bash
	# Move into a new branch for a feature
	git checkout -b feature/thing
	```
	```bash
	# Move into a new branch for a fix
	git checkout -b fix/something
	```

3. Be sure your code follows our practices.
	```bash
	# Test current code
	npm run test
	```
	Our `npm run test` tests and _watch_. Otherwise use `npm run test:ci:unit` for CI level tests.

	We also have nightwatch function tests. You can install nightwatch globally and can run tests like this:
	```
	nightwatch --test tests/functional/specs/Index_spec.js
	```

4. Push your branch up to your fork:
	```bash
	# Push a feature branch
	git push origin feature/thing
	```
	```bash
	# Push a fix branch
	git push origin fix/something
	```

5. Now [open a pull request] with a clear title and description.

## Sever-side integration
Unless you have the backend API running locally, you will need to update the `API_URL`, in `development.env` file, from `localhost` to `api.quran.com`. Leave the port number same.

To start the app, run `npm run dev` which will run both the server and the client (webpack) to compile upon edits. Go to http://localhost:8001 in your browser, not 8000 (that is just the express server).

If you experience an issue, check the [contributing] guidelines.

[upstream]: https://help.github.com/articles/syncing-a-fork/
[contributing]: https://guides.github.com/activities/contributing-to-open-source/
[already been reported]: https://github.com/quran/quran.com-frontend/issues
[fork this project]:     https://github.com/quran/quran.com-frontend/fork
[open a pull request]:   https://help.github.com/articles/using-pull-requests/
