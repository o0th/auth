const { RqliteDialect, typeConfig } = require('knex-rqlite')

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */

module.exports = {
  development: {
    client: RqliteDialect,
    connection: typeConfig({
      host: 'localhost',
      port: 4001
    })
  }
}
