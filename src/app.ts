import express, { Application } from 'express'
import morgan from 'morgan'

// Routes
import { tasks } from './routes/tasks'
import { users } from './routes/users'

export class App {
  private app: Application

  constructor(private port?: number | string) {
    this.app = express()
    this.middlewares()
    this.routes()
  }

  routes() {
    tasks(this.app)
    users(this.app)
  }

  middlewares() {
    this.app.use(morgan('dev'))
    this.app.use(express.json())
  }

  async listen() {
    this.app.listen(this.port)
    console.log(`Server on http://localhost:${this.port}`)
  }
}