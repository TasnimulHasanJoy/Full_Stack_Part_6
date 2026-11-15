import { create } from 'zustand'

const useAnecdoteStore = create((set) => ({
  anecdotes: [],
  filter: '',

  setAnecdotes: (anecdotes) => set({ anecdotes }),

  voteFor: (id) =>
    set((state) => ({
      anecdotes: state.anecdotes.map((anecdote) =>
        anecdote.id === id
          ? { ...anecdote, votes: anecdote.votes + 1 }
          : anecdote
      )
    })),

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