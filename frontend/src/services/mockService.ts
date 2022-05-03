import { createServer, Factory, Model, Response } from 'miragejs'

export default function () {
  let count = 3
  return createServer({
    models: {
      todo: Model
    },
    seeds(server) {
      server.createList('todo', count)
    },
    factories: {
      todo: Factory.extend({
        name: (i) => `item${i}`,
        description: (i) => `des${i}`,
        status: false
      })
    },
    routes() {
      this.get('/api/todos', (schema) => {
        return schema.all('todo')
      })

      this.post('/api/todos', (schema, request) => {
        const body = request.requestBody
        const newTodo: ITodo = JSON.parse(body)
        newTodo.id = `${++count}`
        return schema.create('todo', newTodo)
      })

      this.delete('/api/todos/:id', (schema, request) => {
        const id = request.params.id
        const todo = schema.find('todo', id)
        if (todo) {
          todo.destroy()
          return new Response(204)
        } else {
          return new Response(404, { msg: 'not found' })
        }
      })

      this.put('/api/todos/:id', (schema, request) => {
        const id = request.params.id
        const newTodoBody: ITodo = JSON.parse(request.requestBody)
        const todo = schema.find('todo', id)
        if (todo) {
          todo.update(newTodoBody)
          return new Response(200)
        } else {
          return new Response(404, { msg: 'not found' })
        }
      })
    }
  })
}
