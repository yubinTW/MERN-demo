interface ITodo {
  id: string
  name: string
  description: string
  status: boolean
  createdAt?: string
  updatedAt?: string
}

interface TodoProps {
  todo: ITodo
}

type TodoResponse = {
  todos: Array<ITodo>
}
