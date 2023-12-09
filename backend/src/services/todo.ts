import { ModifyResult } from 'mongoose'

import * as repo from '../repo/todo'
import { Todo } from '../types/todo'

export const getTodos: () => Promise<Array<Todo>> = repo.getTodos

export const addTodo: (todoBody: Todo) => Promise<Todo> = repo.addTodo

export const updateTodo: (id: string, todoBody: Todo) => Promise<Todo | null> = repo.updateTodo

export const deleteTodo: (id: string) => Promise<ModifyResult<Todo>> = repo.deleteTodo
