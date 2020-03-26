import { Application, Router } from 'express'
import { createUser, verifyUser } from '../controllers/users'

export const users = (app: Application) => {
  const router = Router()
  app.use('/api/users', router)

  router.post('/sign-up', (req, res) => {
    createUser(req, res)
  })

  router.post('/sign-in', (req, res) => {
    verifyUser(req, res)
  })
}