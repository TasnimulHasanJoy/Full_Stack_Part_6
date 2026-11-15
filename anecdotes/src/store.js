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

  addAnecdote: (content) =>
    set((state) => ({
      anecdotes: [
        ...state.anecdotes,
        {
          id: String(Date.now()),
          content,
          votes: 0
        }
      ]
    })),

  setFilter: (filter) => set({ filter })
}))

export default useAnecdoteStore