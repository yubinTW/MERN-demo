import { Todo } from './../types/todo'
import TodoModel from './../models/todo'

interface TodoRepo {
  getTodos(): Promise<Array<Todo>>
  addTodo(todoBody: Todo): Promise<Todo>
  updateTodo(id: string, todoBody: Todo): Promise<Todo | null>
  deleteTodo(id: string): Promise<Todo | null>
}

class TodoRepoImpl implements TodoRepo {
  private constructor() {}

  static of(): TodoRepoImpl {
    return new TodoRepoImpl()
  }

  async getTodos(): Promise<Array<Todo>> {
    return TodoModel.find()
  }

  async addTodo(todoBody: Todo): Promise<Todo> {
    return TodoModel.create(todoBody)
  }

  async updateTodo(id: string, todoBody: Todo): Promise<Todo | null> {
    return TodoModel.findByIdAndUpdate(id, todoBody, { new: true })
  }

  async deleteTodo(id: string): Promise<Todo | null> {
    return TodoModel.findByIdAndDelete(id)
  }
}

export { TodoRepoImpl }
