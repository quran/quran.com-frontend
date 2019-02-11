/* eslint-disable */
/**
 * This script will ensure that users are using a supported version of node
 * for the project.
 *
 * NOTE: Ensure this script uses ES5 only as the user may be running an old
 * version of Node, which this script wants to test against.
 */

var exec = require('child_process').exec;
var existsSync = require('fs').existsSync;
var pathResolve = require('path').resolve;

if (existsSync(pathResolve(__dirname, '../../node_modules'))) {
  // An install has already occurred.
  // @ts-ignore
  return null;
}

// Inspired by "create-react-app". Thanks @gaearon :)
function checkNodeVersion() {
  var semver = require('semver');

  if (!semver.satisfies(process.version, packageJson.engines.node)) {
    console.error(
      'You are currently running Node %s but %s requires %s. Please use a supported version of Node.\n',
      process.version,
      packageJson.name,
      packageJson.engines.node
    );
    process.exit(1);
  }
}

var packageJson = require('../../package.json');
if (
  !packageJson.engines ||
  !packageJson.engines.node ||
  !packageJson.devDependencies ||
  !packageJson.devDependencies.semver
) {
  // The package has already been customised. Ignore this script.
  // @ts-ignore
  return;
}

exec(
  'npm install semver@' + packageJson.devDependencies.semver,
  // @ts-ignore
  function installSemverCb(err, stdout, stderr) {
    if (err) throw err;
    checkNodeVersion();
  }
);
