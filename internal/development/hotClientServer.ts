import express from 'express';
import createWebpackMiddleware from 'webpack-dev-middleware';
import createWebpackHotMiddleware from 'webpack-hot-middleware';
import ListenerManager from './listenerManager';
import config from '../../config';
import log from '../../shared/utils/log';

class HotClientServer {
  constructor(compiler: $TsFixMe) {
    const app = express();

    const httpPathRegex = /^https?:\/\/(.*):([\d]{1,5})/i;
    const httpPath = compiler.options.output.publicPath;
    if (!httpPath.startsWith('http') && !httpPathRegex.test(httpPath)) {
      throw new Error(
        'You must supply an absolute public path to a development build of a web target bundle as it will be hosted on a seperate development server to any node target bundles.'
      );
    }

    // eslint-disable-next-line no-unused-vars
    // @ts-ignore
    const [, , port] = httpPathRegex.exec(httpPath);
    // @ts-ignore
    this.webpackDevMiddleware = createWebpackMiddleware(compiler, {
      quiet: true,
      noInfo: true,
      headers: {
        'Access-Control-Allow-Origin': `http://${config('host')}:${config(
          'port'
        )}`,
      },
      // Ensure that the public path is taken from the compiler webpack config
      // as it will have been created as an absolute path to avoid conflicts
      // with an node servers.
      publicPath: compiler.options.output.publicPath,
    });
    // @ts-ignore
    app.use(this.webpackDevMiddleware);
    app.use(createWebpackHotMiddleware(compiler));

    const listener = app.listen(port);
    // @ts-ignore
    this.listenerManager = new ListenerManager(listener, 'client');

    compiler.plugin('compile', () => {
      log({
        title: 'client',
        level: 'info',
        message: 'Building new bundle...',
      });
    });

    compiler.plugin('done', (stats: $TsFixMe) => {
      if (stats.hasErrors()) {
        log({
          title: 'client',
          level: 'error',
          message:
            'Build failed, please check the console for more information.',
          notify: true,
        });
        console.error(stats.toString());
      } else {
        log({
          title: 'client',
          level: 'info',
          message: 'Running with latest changes.',
          notify: true,
        });
      }
    });
  }

  dispose() {
    // @ts-ignore
    this.webpackDevMiddleware.close();

    // @ts-ignore
    if (this.listenerManager) {
      // @ts-ignore
      return this.listenerManager.dispose();
    }

    return Promise.resolve();
  }
}

export default HotClientServer;
