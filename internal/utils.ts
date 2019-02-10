/* eslint-disable */
import HappyPack from 'happypack';

import { execSync } from 'child_process';
import appRootDir from 'app-root-dir';

// Generates a HappyPack plugin.
// @see https://github.com/amireh/happypack/
export function happyPackPlugin({ name, loaders }: $TsFixMe) {
  return new HappyPack({
    id: name,
    verbose: false,
    threads: 4,
    loaders,
  });
}

export function exec(command: $TsFixMe) {
  execSync(command, { stdio: 'inherit', cwd: appRootDir.get() });
}
