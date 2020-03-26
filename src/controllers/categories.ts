import { connect } from '../database'

export async function getCategories() {
  const conn = await connect()
  const [categories] = await conn.query('SELECT * from categories')
  return categories
}