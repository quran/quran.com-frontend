import path from 'path';
import appRootDir from 'app-root-dir';
import { spawn } from 'child_process';
import log from '../../shared/utils/log';

class HotNodeServer {
  constructor(name: $TsFixMe, compiler: $TsFixMe, clientCompiler: $TsFixMe) {
    const compiledEntryFile = path.resolve(
      appRootDir.get(),
      compiler.options.output.path,
      `${Object.keys(compiler.options.entry)[0]}.js`
    );

    const startServer = () => {
      // @ts-ignore
      if (this.server) {
        // @ts-ignore
        this.server.kill();
        // @ts-ignore
        this.server = null;
        log({
          title: name,
          level: 'info',
          message: 'Restarting server...',
        });
      }

      const newServer = spawn('node', [compiledEntryFile, '--color']);

      log({
        title: name,
        level: 'info',
        message: 'Server running with latest changes.',
        notify: true,
      });

      newServer.stdout.on('data', data => console.log(data.toString().trim()));
      newServer.stderr.on('data', data => {
        log({
          title: name,
          level: 'error',
          message:
            'Error in server execution, check the console for more info.',
        });
        console.error(data.toString().trim());
      });
      // @ts-ignore
      this.server = newServer;
    };

    // We want our node server bundles to only start after a successful client
    // build.  This avoids any issues with node server bundles depending on
    // client bundle assets.
    const waitForClientThenStartServer = () => {
      // @ts-ignore
      if (this.serverCompiling) {
        // A new server bundle is building, break this loop.
        return;
      }
      // @ts-ignore
      if (this.clientCompiling) {
        setTimeout(waitForClientThenStartServer, 50);
      } else {
        startServer();
      }
    };

    clientCompiler.plugin('compile', () => {
      // @ts-ignore
      this.clientCompiling = true;
    });

    // @ts-ignore
    clientCompiler.plugin('done', stats => {
      if (!stats.hasErrors()) {
        // @ts-ignore
        this.clientCompiling = false;
      }
    });

    compiler.plugin('compile', () => {
      // @ts-ignore
      this.serverCompiling = true;
      log({
        title: name,
        level: 'info',
        message: 'Building new bundle...',
      });
    });
    // @ts-ignore
    compiler.plugin('done', stats => {
      // @ts-ignore
      this.serverCompiling = false;
      // @ts-ignore
      if (this.disposing) {
        return;
      }

      try {
        if (stats.hasErrors()) {
          log({
            title: name,
            level: 'error',
            message: 'Build failed, check the console for more information.',
            notify: true,
          });
          console.log(stats.toString());

          return;
        }

        waitForClientThenStartServer();
      } catch (err) {
        log({
          title: name,
          level: 'error',
          message:
            'Failed to start, please check the console for more information.',
          notify: true,
        });
        console.error(err);
      }
    });

    // Lets start the compiler.
    // @ts-ignore
    this.watcher = compiler.watch(null, () => undefined);
  }

  dispose() {
    // @ts-ignore
    this.disposing = true;

    const stopWatcher = new Promise(resolve => {
      // @ts-ignore
      this.watcher.close(resolve);
    });

    return stopWatcher.then(() => {
      // @ts-ignore
      if (this.server) this.server.kill();
    });
  }
}

export default HotNodeServer;
