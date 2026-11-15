import { create } from 'zustand'

const useAnecdoteStore = create((set, get) => ({
  anecdotes: [],
  filter: '',

  setAnecdotes: (anecdotes) => set({ anecdotes }),

  voteFor: async (id) => {
    const anecdote = get().anecdotes.find(
      (item) => String(item.id) === String(id)
    )

    if (!anecdote) {
      return
    }

    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    const response = await fetch(
      `http://localhost:3001/anecdotes/${encodeURIComponent(id)}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedAnecdote)
      }
    )

    if (!response.ok) {
      throw new Error('Could not save the vote')
    }

    const savedAnecdote = await response.json()

    set((state) => ({
      anecdotes: state.anecdotes.map((item) =>
        String(item.id) === String(id) ? savedAnecdote : item
      )
    }))
  },

  addAnecdote: async (content) => {
    const response = await fetch('http://localhost:3001/anecdotes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        content,
        votes: 0
      })
    })

    if (!response.ok) {
      throw new Error('Could not save the anecdote')
    }

    const savedAnecdote = await response.json()

    set((state) => ({
      anecdotes: [...state.anecdotes, savedAnecdote]
    }))

    return savedAnecdote
  },

  setFilter: (filter) => set({ filter })
}))

export default useAnecdoteStore