export interface ITask {
  id: number
  user_id: number
  category_id: number
  title: string
  description: string
  is_completed: number
  created_at: Date
  completed_ata: Date
}