import { Application, Router } from 'express'
import response from '../response'
import validateToken from '../middlewares/validateToken'

import {
  getTasks,
  createTask,
  deleteTask,
  updateTask
} from '../controllers/tasks'

export const tasks = (app: Application) => {
  const router = Router()
  app.use('/api/tasks', router)

  router.get('/', validateToken, async (req, res) => {
    try {
      const tasks = await getTasks(req.user_id)
      return response.sucess(req, res, tasks)
    } catch (error) {
      console.log(error)
      return response.error(req, res)
    }
  })

  router.post('/', validateToken, async (req, res) => {
    try {
      await createTask(req.user_id, req.body)
      response.sucess(req, res, 'Task created', 201)
    } catch (error) {
      console.log(error)
      return response.error(req, res)
    }
  })

  router.put('/:id', validateToken, async (req, res) => {
    try {
      await updateTask(req.params.id, req.body, req.user_id)
      response.sucess(req, res, 'Task updated')
    } catch(error) {
      console.log(error)
      return response.error(req, res)
    }
  })

  router.delete('/:id', validateToken, async (req, res) => {
    try {
      await deleteTask(req.params.id, req.user_id)
      response.sucess(req, res, 'Task deleted')
    } catch(error) {
      console.log(error)
      return response.error(req, res)
    }
  })
}
