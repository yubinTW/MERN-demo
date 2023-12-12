import { FastifyInstance } from 'fastify'
import { startedMongoTestContainerOf } from 'testcontainers-mongoose'
import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'

import { serverOf, serverStart } from '../src/server'
import { AppConfig } from '../src/types/appConfig'
import { Todo } from '../src/types/todo'

describe('Todo test', async () => {
  const server: FastifyInstance = serverOf()

  const imageName = 'mongo:7.0.4'
  const mongoContainer = await startedMongoTestContainerOf(imageName)

  beforeAll(async () => {
    const appConfig: AppConfig = {
      FASTIFY_PORT: 8888,
      FASTIFY_HOST: '0.0.0.0',
      MONGO_CONNECTION_STRING: `${mongoContainer.getConnectionString()}?directConnection=true`
    }
    await serverStart(server)(appConfig)
    await server.ready()
  }, 300_000)

  afterEach(async () => {
    await mongoContainer.clearDatabase()
  })

  afterAll(async () => {
    await server.close()
    await mongoContainer.closeDatabase()
  })

  it('should successfully get a empty list of Todos', async () => {
    const response = await server.inject({ method: 'GET', url: '/api/todos' })

    expect(response.statusCode).toBe(200)
    expect(response.body).toStrictEqual(JSON.stringify({ todos: [] }))
  })

  it('should successfully post a Todo to mongodb and can be found', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/todos',
      payload: {
        name: 'clean my desk',
        description: 'Should clean my desk before the remote meeting at 15:00.',
        status: false
      }
    })

    expect(response.statusCode).toBe(201)
    const res: { todo: Todo } = JSON.parse(response.body)
    expect(res.todo.name).toBe('clean my desk')
    expect(res.todo.description).toBe('Should clean my desk before the remote meeting at 15:00.')
    expect(res.todo.status).toBe(false)

    // test if add successfully with get
    const getResponse = await server.inject({ method: 'GET', url: '/api/todos' })
    expect(getResponse.statusCode).toBe(200)
    const res2: { todos: Array<Todo> } = JSON.parse(getResponse.body)
    expect(res2.todos.length).toBe(1)
    expect(res2.todos[0].name).toBe('clean my desk')
    expect(res2.todos[0].description).toBe('Should clean my desk before the remote meeting at 15:00.')
    expect(res2.todos[0].status).toBe(false)
  })

  it('should successfully post a Todo to mongodb and then update it by Id', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/todos',
      payload: {
        name: 'clean my desk',
        description: 'Should clean my desk before the remote meeting at 15:00.',
        status: false
      }
    })

    expect(response.statusCode).toBe(201)
    const res: { todo: Todo } = JSON.parse(response.body)
    expect(res.todo.name).toBe('clean my desk')
    expect(res.todo.description).toBe('Should clean my desk before the remote meeting at 15:00.')
    expect(res.todo.status).toBe(false)

    // update by Id
    const id = res.todo.id
    const updateByIdResponse = await server.inject({
      method: 'PUT',
      url: `/api/todos/${id}`,
      payload: {
        status: true
      }
    })
    expect(updateByIdResponse.statusCode).toBe(200)
    const res2: { todo: Todo } = JSON.parse(updateByIdResponse.body)
    expect(res2.todo.name).toBe('clean my desk')
    expect(res2.todo.description).toBe('Should clean my desk before the remote meeting at 15:00.')
    expect(res2.todo.status).toBe(true)
  })

  it('should successfully post a Todo to mongodb and then delete it by Id', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/api/todos',
      payload: {
        name: 'clean my desk',
        description: 'Should clean my desk before the remote meeting at 15:00.',
        status: false
      }
    })

    expect(response.statusCode).toBe(201)
    const res: { todo: Todo } = JSON.parse(response.body)
    expect(res.todo.name).toBe('clean my desk')
    expect(res.todo.description).toBe('Should clean my desk before the remote meeting at 15:00.')
    expect(res.todo.status).toBe(false)

    // delete by Id
    const id = res.todo.id
    const deleteByIdResponse = await server.inject({
      method: 'DELETE',
      url: `/api/todos/${id}`
    })
    expect(deleteByIdResponse.statusCode).toBe(204)
  })
})
