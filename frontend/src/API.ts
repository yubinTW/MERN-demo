import axios, { AxiosResponse } from 'axios'

const getTodos = async (): Promise<AxiosResponse<Array<ITodo>>> => {
    try {
        const todos = await axios.get('/api/todos')
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
        const todo = await axios.post('/api/todo', newTodo)
        return todo
    } catch (error) {
        console.error(`POST /api/todo ERROR: ${error}`)
        throw new Error(error)
    }
}

const updateTodo = async (todoBody: ITodo): Promise<AxiosResponse<ITodo>> => {
    try {
        const newTodo = {
            ...todoBody,
            status: true
        }
        const todo = await axios.put(`/api/todo/${todoBody._id}`, newTodo)
        return todo
    } catch (error) {
        console.error(`PUT /api/todo/${todoBody._id} ERROR: ${error}`)
        throw new Error(error)
    }
}

const deleteTodo = async (id: string): Promise<AxiosResponse> => {
    try {
        const res = await axios.delete(`/api/todo/${id}`)
        return res
    } catch (error) {
        console.error(`DELETE /api/todo/${id} ERROR: ${error}`)
        throw new Error(error)
    }
}

export { getTodos, addTodo, updateTodo, deleteTodo }
