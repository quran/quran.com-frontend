const log = require('../../shared/utils/log');

class ListenerManager {
  // @ts-ignore
  constructor(listener, name) {
    // @ts-ignore
    this.name = name || 'listener';
    // @ts-ignore
    this.lastConnectionKey = 0;
    // @ts-ignore
    this.connectionMap = {};
    // @ts-ignore
    this.listener = listener;

    // Track all connections to our server so that we can close them when needed.
    // @ts-ignore
    this.listener.on('connection', connection => {
      // Increment the connection key.
      // @ts-ignore
      this.lastConnectionKey += 1;
      // Generate a new key to represent the connection
      // @ts-ignore
      const connectionKey = this.lastConnectionKey;
      // Add the connection to our map.
      // @ts-ignore
      this.connectionMap[connectionKey] = connection;
      // Remove the connection from our map when it closes.
      connection.on('close', () => {
        // @ts-ignore
        delete this.connectionMap[connectionKey];
      });
    });
  }

  killAllConnections() {
    // @ts-ignore
    Object.keys(this.connectionMap).forEach(connectionKey => {
      // @ts-ignore
      this.connectionMap[connectionKey].destroy();
    });
  }

  dispose() {
    return new Promise(resolve => {
      // @ts-ignore
      if (this.listener) {
        this.killAllConnections();

        log({
          // @ts-ignore
          title: this.name,
          level: 'info',
          message: 'Destroyed all existing connections.',
        });
        // @ts-ignore
        this.listener.close(() => {
          log({
            // @ts-ignore
            title: this.name,
            level: 'info',
            message: 'Closed listener.',
          });

          resolve();
        });
      } else {
        resolve();
      }
    });
  }
}

export default ListenerManager;
