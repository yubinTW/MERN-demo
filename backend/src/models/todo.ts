import { ITodo } from './../types/todo'
import { model, Schema } from 'mongoose'

const todoSchema: Schema = new Schema(
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

export default model<ITodo>('Todo', todoSchema)
