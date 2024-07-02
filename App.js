'use strict'

const path = require('path')
const AutoLoad = require('@fastify/autoload')
const fastifyStatic = require('@fastify/static');

module.exports = async function (fastify, opts) {
  // Place here your custom code!

  fastify.register(fastifyStatic, {
    root: `${process.cwd()}/my-app/build`,
  });

  fastify.setNotFoundHandler((req, res) => {
    res.sendFile('index.html');
  });

  // Do not touch the following lines

  // This loads all plugins defined in plugins
  // those should be support plugins that are reused
  // through your application
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'plugins'),
    options: Object.assign({}, opts)
  })

  // This loads all plugins defined in routes
  // define your routes in one of these
  fastify.register(AutoLoad, {
    dir: path.join(__dirname, 'routes'),
    options: Object.assign({}, opts)
  })
}
