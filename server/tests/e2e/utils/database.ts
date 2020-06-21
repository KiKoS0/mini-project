import { Connection } from 'typeorm'

export const migrateDatabase = async (connection: Connection) => {
  await connection.dropDatabase()
  return connection.runMigrations()
}
