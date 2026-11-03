import { create } from 'zustand'

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place.'
]

const useAnecdoteStore = create((set) => ({
  anecdotes,
  votes: anecdotes.map(() => 0),
  selected: 0,

  vote: () =>
    set((state) => ({
      votes: state.votes.map((count, index) =>
        index === state.selected ? count + 1 : count
      )
    })),

  nextAnecdote: () =>
    set((state) => ({
      selected: Math.floor(Math.random() * state.anecdotes.length)
    }))
}))

export default useAnecdoteStore