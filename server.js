const express = require('express');
const helmet = require('helmet');

const zooRouter = require('./Routers/zooRouter');

const server = express();

server.use(express.json());
server.use(helmet());

server.use('/api/zoo', zooRouter);

module.exports = server;