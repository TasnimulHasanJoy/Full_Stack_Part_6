import { create } from 'zustand'

const initialAnecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place.'
]

const useAnecdoteStore = create((set) => ({
  anecdotes: initialAnecdotes,
  votes: initialAnecdotes.map(() => 0),

  voteFor: (index) =>
    set((state) => ({
      votes: state.votes.map((count, currentIndex) =>
        currentIndex === index ? count + 1 : count
      )
    })),

  addAnecdote: (anecdote) =>
    set((state) => ({
      anecdotes: [...state.anecdotes, anecdote],
      votes: [...state.votes, 0]
    }))
}))

export default useAnecdoteStore