import axios, { AxiosResponse } from 'axios'
import { ITodo, TodoResponse } from '../types/todo'

const API_HOST = process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_API_HOST

const getTodos = async (): Promise<AxiosResponse<TodoResponse>> => {
  try {
    console.log(`process.env.NODE_ENV = ${process.env.NODE_ENV}`)
    console.log(`API_HOST = ${API_HOST}`)
    const res = await axios.get<TodoResponse>(`${API_HOST}/api/todos`)
    return Promise.resolve(res)
  } catch (error) {
    return Promise.reject(`GET /todos ERROR: ${error}`)
  }
}

const addTodo = async (todoBody: ITodo): Promise<AxiosResponse<ITodo>> => {
  try {
    const newTodo = {
      ...todoBody,
      status: false
    }
    const todo = await axios.post(`${API_HOST}/api/todos`, newTodo)
    return todo
  } catch (error) {
    console.error(`POST /api/todos ERROR: ${error}`)
    throw new Error(`${error}`)
  }
}

const updateTodo = async (todoBody: ITodo): Promise<AxiosResponse<ITodo>> => {
  try {
    const newTodo = {
      ...todoBody,
      status: true
    }
    const todo = await axios.put(`${API_HOST}/api/todos/${todoBody.id}`, newTodo)
    return todo
  } catch (error) {
    console.error(`PUT /api/todos/${todoBody.id} ERROR: ${error}`)
    throw new Error(`${error}`)
  }
}

const deleteTodo = async (id: string): Promise<AxiosResponse> => {
  try {
    const res = await axios.delete(`${API_HOST}/api/todos/${id}`)
    return res
  } catch (error) {
    console.error(`DELETE /api/todos/${id} ERROR: ${error}`)
    throw new Error(`${error}`)
  }
}

export { getTodos, addTodo, updateTodo, deleteTodo }
