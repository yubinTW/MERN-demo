import { ITodo } from './../types/todo'
import Todo from './../models/todo'

interface TodoRepo {
  getTodos(): Promise<Array<ITodo>>
  addTodo(todoBody: ITodo): Promise<ITodo>
  updateTodo(id: string, todoBody: ITodo): Promise<ITodo | null>
  deleteTodo(id: string): Promise<ITodo | null>
}

class TodoRepoImpl implements TodoRepo {
  private constructor() {}

  static of(): TodoRepoImpl {
    return new TodoRepoImpl()
  }

  async getTodos(): Promise<Array<ITodo>> {
    return Todo.find()
  }

  async addTodo(todoBody: ITodo): Promise<ITodo> {
    return Todo.create(todoBody)
  }

  async updateTodo(id: string, todoBody: ITodo): Promise<ITodo | null> {
    return Todo.findByIdAndUpdate(id, todoBody, { new: true })
  }

  async deleteTodo(id: string): Promise<ITodo | null> {
    return Todo.findByIdAndDelete(id)
  }
}

export { TodoRepoImpl }
