import { ITodo } from './../types/todo'
import mongoose from 'mongoose'

const todoSchema: mongoose.Schema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    status: {
      type: Boolean,
      required: true
    }
  },
  {
    timestamps: true
  }
)

todoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false
})

export default mongoose.models.Todo || mongoose.model<ITodo>('Todo', todoSchema)
