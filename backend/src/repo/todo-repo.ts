import { Todo } from './../types/todo'
import TodoModel from './../models/todo'

export const getTodos: () => Promise<Array<Todo>> = () => {
  return TodoModel.find().exec()
}

export const addTodo: (todoBody: Todo) => Promise<Todo> = (todoBody) => {
  return TodoModel.create(todoBody)
}

export const updateTodo: (id: string, todoBody: Todo) => Promise<Todo | null> = (id, todoBody) => {
  return TodoModel.findByIdAndUpdate(id, todoBody, { new: true })
}

export const deleteTodo: (id: string) => Promise<Todo | null> = (id) => {
  return TodoModel.findByIdAndDelete(id)
}
