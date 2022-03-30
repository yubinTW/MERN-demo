import React from 'react'
import { render, screen } from '@testing-library/react'
import App from '../App'

test('should show the title', () => {
  render(<App />)
  const todoTitle = screen.getByText('My Todos')
  expect(todoTitle).toBeInTheDocument()
})
