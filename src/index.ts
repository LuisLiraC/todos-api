import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { users } from './routes/users'
import { tasks } from './routes/tasks'
import { categories } from './routes/categories'
import { config } from './config'

const app = express()
app.use(morgan('dev'))
app.use(cors())
app.use(express.json())

users(app)
tasks(app)
categories(app)

app.listen(config.port, () => {
  console.log(`Server on http://localhost:${config.port}`)
})