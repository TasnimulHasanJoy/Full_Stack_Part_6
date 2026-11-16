import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import AnecdoteList from './AnecdoteList'
import useAnecdoteStore from '../store'

describe('AnecdoteList', () => {
  it('renders anecdotes from the store sorted by votes', () => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: '1', content: 'Few votes', votes: 1 },
        { id: '2', content: 'Most votes', votes: 5 },
        { id: '3', content: 'Some votes', votes: 3 }
      ],
      filter: ''
    })

    const { container } = render(<AnecdoteList />)
    const renderedContents = Array.from(container.firstChild.children).map(
      (anecdote) => anecdote.firstElementChild.textContent
    )

    expect(renderedContents).toEqual(['Most votes', 'Some votes', 'Few votes'])
  })
})
