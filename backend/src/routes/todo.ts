import { FastifyInstance, RouteShorthandOptions } from 'fastify'

import { postTodosBodySchema, todoResponseSchema, todosResponseSchema } from '../responseSchemas/todo'
import { Todo } from '../types/todo'
import * as repo from './../repo/todo-repo'

export const TodoRouter = (server: FastifyInstance, opts: RouteShorthandOptions, done: (error?: Error) => void) => {
  interface IdParam {
    id: string
  }

  const getTodosResponseSchema: RouteShorthandOptions = {
    ...opts,
    schema: {
      response: {
        200: todosResponseSchema
      }
    }
  }

  server.get('/todos', getTodosResponseSchema, async (request, reply) => {
    try {
      const todos = await repo.getTodos()
      return reply.status(200).send({ todos })
    } catch (error) {
      server.log.error(`GET /todos Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  const postTodosOptions = {
    ...opts,
    schema: {
      body: postTodosBodySchema,
      response: {
        201: todoResponseSchema
      }
    }
  }

  server.post('/todos', postTodosOptions, async (request, reply) => {
    try {
      const todoBody = request.body as Todo
      const todo = await repo.addTodo(todoBody)
      return reply.status(201).send({ todo })
    } catch (error) {
      server.log.error(`POST /todos Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  server.put<{ Params: IdParam; Body: Todo }>('/todos/:id', opts, async (request, reply) => {
    try {
      const id = request.params.id
      const todoBody = request.body
      const todo = await repo.updateTodo(id, todoBody)
      if (todo) {
        return reply.status(200).send({ todo })
      } else {
        return reply.status(404).send({ msg: `Not Found Todo:${id}` })
      }
    } catch (error) {
      server.log.error(`PUT /todos/${request.params.id} Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  server.delete<{ Params: IdParam }>('/todos/:id', opts, async (request, reply) => {
    try {
      const id = request.params.id
      const todo = await repo.deleteTodo(id)
      if (todo) {
        return reply.status(204).send()
      } else {
        return reply.status(404).send({ msg: `Not Found Todo:${id}` })
      }
    } catch (error) {
      server.log.error(`DELETE /todos/${request.params.id} Error: ${error}`)
      return reply.status(500).send(`[Server Error]: ${error}`)
    }
  })

  done()
}
