import 'reflect-metadata'
import path from 'path'
import { env } from './config'
import { createExpressServer, useContainer as routingUseContainer } from 'routing-controllers'
import { useContainer as classValidatorUseContainer } from 'class-validator'
import { Container } from 'typedi'
import { useContainer as ormUseContainer } from 'typeorm'
import { loadDatabase } from '../src/database/dbLoader'
import * as http from 'http'
import { Application } from 'express'
import * as express from 'express'
import { Connection } from 'typeorm/connection/Connection'
import { authorizationChecker } from './app/auth/authorizationChecker'
import { currentUserChecker } from './app/auth/currentUserChecker'
import { loadBooksProviders } from './app/providers/utils/bookProviderLoader'

export interface BootstrapSettings {
    app: Application;
    server: http.Server;
    connection: Connection;
}

export default async (E2E_TEST = false): Promise<BootstrapSettings> => {
// Register inversion of control containers
  routingUseContainer(Container)
  ormUseContainer(Container)
  classValidatorUseContainer(Container)
  loadBooksProviders(Container)

  const conn = await loadDatabase()

  const corsOptions = {
    // Allow all for now
    origin: '*'
  }

  // Create the express app with the controllers and middlewares
  const app = createExpressServer({
    cors: corsOptions,
    routePrefix: env.app.routePrefix,
    controllers: env.app.dirs.controllers,
    middlewares: env.app.dirs.middlewares,
    authorizationChecker: authorizationChecker(conn),
    currentUserChecker: currentUserChecker(conn)
  })

  // Load public
  const pathToPublic = path.resolve(__dirname, 'public')
  app.use(express.static(pathToPublic))

  let server = null

  if (!env.isTest) {
    server = app.listen(env.app.port, () => console.log(`Server is running on port: ${env.app.port}`))
  }
  return {
    app: app as Application,
    connection: conn as Connection,
    server: server as http.Server
  }
}
