import { Type } from '@sinclair/typebox'

const todosResponseSchema = Type.Object({
  todos: Type.Array(
    Type.Object({
      id: Type.String(),
      name: Type.String(),
      description: Type.String(),
      status: Type.Boolean()
    })
  )
})

const todoResponseSchema = Type.Object({
  todo: Type.Object({
    id: Type.String(),
    name: Type.String(),
    description: Type.String(),
    status: Type.Boolean()
  })
})

const postTodosBodySchema = Type.Object({
  name: Type.String(),
  description: Type.Optional(Type.String()),
  status: Type.Boolean()
})

export { todosResponseSchema, todoResponseSchema, postTodosBodySchema }
