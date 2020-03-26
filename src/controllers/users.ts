import { Request, Response, json } from 'express'
import { connect } from '../database/database'
import { IUser } from '../interface/User'
import auth from '../auth/index'
import bcryptjs from 'bcryptjs'
import response from '../response'

export async function createUser(req: Request, res: Response) {
  const conn = await connect()
  const newUser: IUser = req.body
  newUser.username = newUser.username.replace(/\s/g, '')
  const userExists: IUser = await getUser(newUser.username)

  if (!userExists) {
    newUser.password = await bcryptjs.hash(newUser.password, 10)
    await conn.query('INSERT INTO users set ?', [newUser])
    return response.sucess(req, res, 'User created', 201)
  } else {
    return response.error(req, res, 'User already exists', 400)
  }
}

export async function verifyUser(req: Request, res: Response) {
  const userData: IUser = req.body
  const foundUser: IUser = await getUser(userData.username.trim())

  if (!foundUser) {
    return response.error(req, res, 'User does not exists', 400)
  }

  const result = await bcryptjs.compare(userData.password, foundUser.password)

  if (result) {
    delete foundUser.password
    const token: string = auth.sign(foundUser)
    return response.sucess(req, res, token)
  } else {
    return response.error(req, res, 'Invalid information', 400)
  }
}

async function getUser(username: string) {
  const conn = await connect()
  const [foundData] = await conn.query(
    'SELECT username, password FROM users WHERE username = ?',
    [username]
  )
  const [foundUser]: [IUser] = await JSON.parse(JSON.stringify(foundData))
  return foundUser
}
