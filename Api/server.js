const express = require('express');

const server = express();

const postsRouter = require('../Posts/post-router.js');

server.use(express.json());

server.get('/', (req, res) => {
    res.send(`
      <h2>Lambda Hubs API</h2>
      <p>Welcome to the Lambda Hubs API</p>
    `);
  });

server.use('/api/posts', postsRouter);

module.exports = server;