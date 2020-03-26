import { Request, Response } from 'express'
import { connect } from '../database/database'
import { ITask } from '../interface/Task'

export async function getTasks(user_id: number) {
  const conn = await connect()
  const [tasks] = await conn.query('SELECT * FROM tasks WHERE user_id = ?', [user_id])
  return tasks
}

export async function createTask(user_id: number, newTask: ITask) {
  newTask.user_id = user_id
  const conn = await connect()
  return await conn.query('INSERT INTO tasks SET ?', [newTask])
}

export async function updateTask(id: string, updateTask: ITask, user_id: number) {
  const conn = await connect()
  return await conn.query('UPDATE tasks set ? WHERE id = ? AND user_id = ?', [updateTask, id, user_id])
}

export async function deleteTask(id: string, user_id: number) {
  const conn = await connect()
  return await conn.query('DELETE FROM tasks WHERE id = ? AND user_id = ?', [id, user_id])
}
