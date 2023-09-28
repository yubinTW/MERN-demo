import TodoModel from './../models/todo'
import { Todo } from './../types/todo'

export const getTodos: () => Promise<Array<Todo>> = () => TodoModel.find().exec()

export const addTodo: (todoBody: Todo) => Promise<Todo> = (todoBody) => TodoModel.create(todoBody)

export const updateTodo: (id: string, todoBody: Todo) => Promise<Todo | null> = (id, todoBody) =>
  TodoModel.findByIdAndUpdate(id, todoBody, { new: true })

export const deleteTodo: (id: string) => Promise<Todo | null> = (id) => TodoModel.findByIdAndDelete(id)
