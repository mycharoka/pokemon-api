const { createTerminus } = require('@godaddy/terminus');

const { logger } = require('../logger')
const db = require('../database')


function onSignal() {
  logger.info('server is starting cleanup')
  db.cleanUp()
}

async function onHealthCheck() {
  // checks if the system is healthy, like the db connection is live
  // resolves, if health, rejects if not
}

const registerTerminus = server => {
  createTerminus(server, {
    signal: 'SIGINT',
    healthChecks: { '/healthcheck': onHealthCheck },
    onSignal
  })
}

module.exports = {
  registerTerminus
}