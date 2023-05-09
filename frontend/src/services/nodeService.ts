import axios, { AxiosResponse } from 'axios'
import { ITodo, TodoResponse } from '../types/todo'

export const getTodos = async (): Promise<AxiosResponse<TodoResponse>> => {
  try {
    const res = await axios.get<TodoResponse>(`/api/todos`)
    return Promise.resolve(res)
  } catch (error) {
    return Promise.reject(`GET /todos ERROR: ${error}`)
  }
}

export const addTodo = async (todoBody: ITodo): Promise<AxiosResponse<ITodo>> => {
  try {
    const newTodo = {
      ...todoBody,
      status: false
    }
    const todo = await axios.post(`/api/todos`, newTodo)
    return todo
  } catch (error) {
    console.error(`POST /api/todos ERROR: ${error}`)
    throw new Error(`${error}`)
  }
}

export const updateTodo = async (todoBody: ITodo): Promise<AxiosResponse<ITodo>> => {
  try {
    const newTodo = {
      ...todoBody,
      status: true
    }
    const todo = await axios.put(`/api/todos/${todoBody.id}`, newTodo)
    return todo
  } catch (error) {
    console.error(`PUT /api/todos/${todoBody.id} ERROR: ${error}`)
    throw new Error(`${error}`)
  }
}

export const deleteTodo = async (id: string): Promise<AxiosResponse> => {
  try {
    const res = await axios.delete(`/api/todos/${id}`)
    return res
  } catch (error) {
    console.error(`DELETE /api/todos/${id} ERROR: ${error}`)
    throw new Error(`${error}`)
  }
}
