import { FastifyInstance, RouteShorthandOptions, FastifyReply } from 'fastify'
import { ITodo } from '../types/todo'
import { TodoRepoImpl } from './../repo/todo-repo'

const TodoRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  const todoRepo = TodoRepoImpl.of()

  interface IdParam {
    id: string
  }

  server.get('/todos', opts, async (request, reply) => {
    try {
      const todos = await todoRepo.getTodos()
      return reply.status(200).send({ todos })
    } catch (error) {
      console.error(`GET /todos Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  const postTodosBodySchema = {
    type: 'object',
    required: ['name', 'status'],
    properties: {
      name: { type: 'string' },
      description: { type: 'string' },
      status: { type: 'string' }
    }
  }

  const postOptions = { ...opts, schema: { body: postTodosBodySchema } }

  server.post('/todos', postOptions, async (request, reply) => {
    try {
      const todoBody = request.body as ITodo
      const todo = await todoRepo.addTodo(todoBody)
      return reply.status(201).send({ todo })
    } catch (error) {
      console.error(`POST /todos Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  server.put<{ Params: IdParam; Body: ITodo }>('/todos/:id', opts, async (request, reply) => {
    try {
      const id = request.params.id
      const todoBody = request.body
      const todo = await todoRepo.updateTodo(id, todoBody)
      if (todo) {
        return reply.status(200).send({ todo })
      } else {
        return reply.status(404).send({ msg: `Not Found Todo:${id}` })
      }
    } catch (error) {
      console.error(`PUT /todos/${request.params.id} Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  server.delete<{ Params: IdParam }>('/todos/:id', opts, async (request, reply) => {
    try {
      const id = request.params.id
      const todo = await todoRepo.deleteTodo(id)
      if (todo) {
        return reply.status(204).send()
      } else {
        return reply.status(404).send({ msg: `Not Found Todo:${id}` })
      }
    } catch (error) {
      console.error(`DELETE /todos/${request.params.id} Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  done()
}

export { TodoRouter }
