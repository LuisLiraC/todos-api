import { Request, Response, NextFunction } from 'express'
import { connect } from '../database'
import { IUser } from '../interface/User'
import response from '../response'
import auth from '../auth'

export default async function validateToken(req: Request,res: Response,next: NextFunction) {
  try {
    const token = req.headers.authorization?.replace('Bearer ', '')

    if (!token) {
      throw new Error('Missing token')
    }

    const { username } = auth.decodeToken(token)

    const conn = await connect()
    const [foundData] = await conn.query('SELECT id FROM users WHERE username = ?', [username])
    const [user]: [IUser] = await JSON.parse(JSON.stringify(foundData))
  
    if (!user) {
      throw new Error('Unauthorized')
    }
  
    req.user_id = user.id
  
    next()

  } catch(error) {
    response.error(req, res, error.message, 403)
  }
}
