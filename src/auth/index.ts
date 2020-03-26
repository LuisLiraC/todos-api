import jwt from 'jsonwebtoken'
import { config } from '../config'

const sign = (payload: Object) => {
  // @ts-ignore
  return jwt.sign(payload, config.authSecret, { expiresIn: '60m' })
}

const decodeToken = (token: string) => {
  try {
    // @ts-ignore
    const decoded = jwt.verify(token, config.authSecret)
    return decoded
  } catch (error) {
    throw new Error('Unauthorized')
  }
}

export default {
  sign,
  decodeToken
}