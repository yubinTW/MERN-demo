import React from 'react'
import { render, screen } from '@testing-library/react'
import AddTodo from '../components/AddTodo'

test('should show the field name and button', () => {
  render(<AddTodo saveTodo={() => {}} />)
  const nameText = screen.getByText('Name')
  expect(nameText).toBeInTheDocument()
  const nameInput = screen.getByLabelText('Name')
  expect(nameInput).toHaveAttribute('required')

  const descText = screen.getByText('Description')
  expect(descText).toBeInTheDocument()
  const descInput = screen.getByLabelText('Description')
  expect(descInput).toHaveAttribute('required')

  const addButton = screen.getByText('Add Todo')
  expect(addButton).toHaveAttribute('disabled')
})
