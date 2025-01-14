import fs from 'node:fs'
import util from 'node:util'

import { DataApiClient } from 'rqlite-js'

const client = new DataApiClient('http://rqlite:4001')

const migrationQuery = 'select name from sqlite_master where type = \'table\' and name = \'migrations\''
const migrationQueryResult = await client.query(migrationQuery)

if (migrationQueryResult.hasError()) {
  const error = migrationQueryResult.getFirstError()
  process.stderr.write(error, 'rqlite create tables results contained an error.\n')
  process.exit(1)
}

if (migrationQueryResult.get(0).get('name') === undefined) {
  const createMigrationQuery = `CREATE TABLE migrations (
    migrationID INTEGER PRIMARY KEY AUTOINCREMENT
  );`

  const createMigrationResult = await client.execute(createMigrationQuery)

  if (createMigrationResult.hasError()) {
    const error = createMigrationResult.getFirstError()
    process.stderr.write(error, 'rqlite create tables results contained an error.\n')
    process.exit(1)
  }
}

const readdir = util.promisify(fs.readdir)
const migrationDir = await readdir('./migrations')
const migrationFiles = migrationDir.filter(file => file.endsWith('.js') && file !== 'index.js')

console.log(migrationDir)
console.log(migrationFiles)
process.exit(0)
