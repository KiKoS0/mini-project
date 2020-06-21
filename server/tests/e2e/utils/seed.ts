import { Connection } from 'typeorm'
import { User } from '../../../src/app/models/user'

export const runDbSeed = async (connection: Connection) => {
  const em = connection.createEntityManager()

  const user = new User()
  user.email = 'user@user.com'
  user.username = 'user'
  user.password = 'useruser'
  await em.save(user)
}
