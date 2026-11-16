import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it, vi } from 'vitest'
import AnecdoteList from './AnecdoteList'
import Filter from './Filter'
import useAnecdoteStore from '../store'

describe('AnecdoteList', () => {
  afterEach(() => {
    cleanup()
    vi.unstubAllGlobals()
  })

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

  it('renders only anecdotes that match the filter', () => {
    useAnecdoteStore.setState({
      anecdotes: [
        { id: '1', content: 'Clean code matters', votes: 2 },
        { id: '2', content: 'React is a library', votes: 5 },
        { id: '3', content: 'More about clean code', votes: 1 }
      ],
      filter: ''
    })

    const { container } = render(
      <>
        <Filter />
        <AnecdoteList />
      </>
    )

    fireEvent.change(screen.getByTestId('filter'), {
      target: { value: 'clean code' }
    })

    const renderedContents = Array.from(
      container.querySelectorAll('div > div > p:first-child')
    ).map((anecdote) => anecdote.textContent)

    expect(renderedContents).toEqual([
      'Clean code matters',
      'More about clean code'
    ])
  })

  it('increases the anecdote vote count when voted for', async () => {
    const anecdote = { id: '1', content: 'Testing is useful', votes: 1 }
    const updatedAnecdote = { ...anecdote, votes: 2 }

    useAnecdoteStore.setState({ anecdotes: [anecdote], filter: '' })
    vi.stubGlobal(
      'fetch',
      vi.fn().mockResolvedValue({
        ok: true,
        json: async () => updatedAnecdote
      })
    )

    render(<AnecdoteList />)

    await fireEvent.click(screen.getByRole('button', { name: 'vote' }))

    expect(await screen.findByText(/has 2/)).toBeTruthy()
  })
})
