import React, { useState } from 'react'

const AddTodo = (
    props: {
        saveTodo: (e: React.FormEvent, formData: ITodo | any) => void
    }) => {

    const [formData, setFormData] = useState<ITodo | {}>()

    const handleForm = (e: React.FormEvent<HTMLInputElement>): void => {
        setFormData({
            ...formData,
            [e.currentTarget.id]: e.currentTarget.value
        })
    }

    return (
        <form className="Form" onSubmit={e => props.saveTodo(e, formData)}>
            <div>
                <div>
                    <label htmlFor="name">Name</label>
                    <input onChange={handleForm} type="text" id="name" required />
                </div>
                <div>
                    <label htmlFor="description">Description</label>
                    <input onChange={handleForm} type="text" id="description" required />
                </div>
            </div>
            <button disabled={formData === undefined ? true : false}>Add Todo</button>
        </form>
    )
}

export default AddTodo
