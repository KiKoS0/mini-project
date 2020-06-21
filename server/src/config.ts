import * as dotenv from 'dotenv'
import * as path from 'path'
import pkg from '../package.json'

import { getEnvVar, getEnvVarOptional, getOsPaths, toBool, toNumber } from './env'

dotenv.config({ path: path.join(process.cwd(), `.env${((process.env.NODE_ENV === 'test') ? '.test' : '')}`) })

export const env = {
  node: process.env.NODE_ENV || 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  isDevelopment: process.env.NODE_ENV === 'development',
  app: {
    name: getEnvVar('APP_NAME'),
    version: (pkg as any).version, //eslint-disable-line
    port: process.env.PORT || getEnvVar('APP_PORT'),
    routePrefix: getEnvVar('APP_ROUTE_PREFIX'),
    dirs: {
      migrations: getOsPaths('TYPEORM_MIGRATIONS'),
      entities: getOsPaths('TYPEORM_ENTITIES'),
      middlewares: getOsPaths('MIDDLEWARES'),
      controllers: getOsPaths('CONTROLLERS')
    }
  },
  jwt: {
    secret: getEnvVar('JWT_SECRET'),
    expires: getEnvVar('JWT_EXPIRES'),
    issuer: getEnvVar('JWT_ISSUER')
  },
  db: {
    type: getEnvVar('TYPEORM_CONNECTION'),
    host: getEnvVarOptional('TYPEORM_HOST'),
    port: toNumber(getEnvVarOptional('TYPEORM_PORT') as string),
    username: getEnvVarOptional('TYPEORM_USERNAME'),
    password: getEnvVarOptional('TYPEORM_PASSWORD'),
    database: getEnvVar('TYPEORM_DATABASE'),
    synchronize: toBool(getEnvVarOptional('TYPEORM_SYNCHRONIZE')as string),
    logging: getEnvVar('TYPEORM_LOGGING')
  },
  providers: {
    google: {
      endPoint: getEnvVarOptional('GOOGLE_API_ENDPOINT'),
      apiKey: getEnvVarOptional('GOOGLE_API_KEY')
    },
    goodReads: {
      endPoint: getEnvVarOptional('GOODREADS_API_ENDPOINT'),
      apiKey: getEnvVarOptional('GOODREADS_API_KEY')
    }
  }
}
