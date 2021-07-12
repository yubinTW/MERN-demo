import axios, { AxiosResponse } from 'axios'

const API_URL = 'http://localhost:8888/api'

const getTodos = async (): Promise<AxiosResponse<Array<ITodo>>> => {
    try {
        const todos = await axios.get(`${API_URL}/todos`)
        return todos
    } catch (error) {
        console.error(`GET /api/todos ERROR: ${error}`)
        throw new Error(error)
    }
}

const addTodo = async (todoBody: ITodo): Promise<AxiosResponse<ITodo>> => {
    try {
        const newTodo = {
            ...todoBody,
            status: false
        }
        const todo = await axios.post(`${API_URL}/todos`, newTodo)
        return todo
    } catch (error) {
        console.error(`POST /api/todos ERROR: ${error}`)
        throw new Error(error)
    }
}

const updateTodo = async (todoBody: ITodo): Promise<AxiosResponse<ITodo>> => {
    try {
        const newTodo = {
            ...todoBody,
            status: true
        }
        const todo = await axios.put(`${API_URL}/todos/${todoBody._id}`, newTodo)
        return todo
    } catch (error) {
        console.error(`PUT /api/todos/${todoBody._id} ERROR: ${error}`)
        throw new Error(error)
    }
}

const deleteTodo = async (id: string): Promise<AxiosResponse> => {
    try {
        const res = await axios.delete(`${API_URL}/todos/${id}`)
        return res
    } catch (error) {
        console.error(`DELETE /api/todos/${id} ERROR: ${error}`)
        throw new Error(error)
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo }
