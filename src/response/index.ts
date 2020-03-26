import { Response, Request } from 'express'

const sucess = (req: Request, res: Response, response = '', status = 200) => {
  res.status(status).send({
    response,
    error: false
  })
}

const error = (req: Request, res: Response, response = 'Internal server error', status = 500) => {
  res.status(status).send({
    response,
    error: true
  })
}

export default {
  sucess,
  error
}