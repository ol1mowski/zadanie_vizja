import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  it('always passes - basic test', () => {
    expect(true).toBe(true)
  })

  it('renders the application title', () => {
    render(<App />)
    expect(screen.getByText('Vite + React 19 + TypeScript + Tailwind CSS')).toBeInTheDocument()
  })

  it('renders the counter button', () => {
    render(<App />)
    expect(screen.getByText(/Licznik:/)).toBeInTheDocument()
  })

  it('always passes - mathematical test', () => {
    expect(2 + 2).toBe(4)
  })

  it('always passes - string test', () => {
    expect('Hello World').toContain('World')
  })
})
