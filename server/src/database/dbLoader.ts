import { env } from '../config'
import { getConnectionOptions, createConnection } from 'typeorm'

export async function loadDatabase () {
  const loadedConnectionOptions = await getConnectionOptions()

  // Environment variables can overwrite the getConnectionOptions properties
  const connectionOptions = Object.assign(loadedConnectionOptions, {
    type: env.db.type as any, //eslint-disable-line
    host: env.db.host,
    port: env.db.port,
    username: env.db.username,
    password: env.db.password,
    database: env.db.database,
    synchronize: env.db.synchronize,
    logging: env.db.logging,
    entities: env.app.dirs.entities,
    migrations: env.app.dirs.migrations
  })

  const connection = await createConnection(connectionOptions)
  return connection
}
