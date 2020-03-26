import { Application, Router } from 'express'
import response from '../response'
import validateToken from '../middlewares/validateToken'
import { getCategories } from '../controllers/categories'
import { getTasksByCategory } from '../controllers/tasks'


export const categories = (app: Application) => {
  const router = Router()
  app.use('/api/categories', router)

  router.get('/', validateToken, async (req, res) => {
    try {
      const categories = await getCategories()
      response.sucess(req, res, categories)
    } catch (error) {
      console.log(error)
      response.error(req, res)
    }
  })

  router.get('/:id/tasks', validateToken, async (req, res) => {
    try {
      const tasks = await getTasksByCategory(req.user_id, req.params.id)
      response.sucess(req, res, tasks)
    } catch (error) {
      console.log(error)
      response.error(req, res)
    }
  })
}