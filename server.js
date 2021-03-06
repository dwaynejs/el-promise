const path = require('path');
const http = require('http');
const express = require('express');

module.exports = () => {
  const app = express();
  const server = http.Server(app);

  app.use(express.static(path.resolve('./')));

  app.use(/.*/, (req, res) => {
    res.sendFile(path.resolve('index.html'));
  });

  return {
    listen(port) {
      return new Promise((resolve, reject) => {
        port = port || 4777;

        server.listen(port, (error) => {
          if (error) {
            console.error(error);

            reject(error);
          } else {
            console.info('Listening on port %s...', port);

            resolve();
          }
        });
      });
    }
  };
};
