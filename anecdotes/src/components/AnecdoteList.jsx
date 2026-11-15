import useAnecdoteStore from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const votes = useAnecdoteStore((state) => state.votes)
  const filter = useAnecdoteStore((state) => state.filter)
  const voteFor = useAnecdoteStore((state) => state.voteFor)

  const visibleAnecdotes = anecdotes
    .map((anecdote, index) => ({
      anecdote,
      votes: votes[index],
      index
    }))
    .filter(({ anecdote }) =>
      anecdote.toLowerCase().includes(filter.toLowerCase())
    )
    .toSorted((first, second) => second.votes - first.votes)

  return (
    <div>
      {visibleAnecdotes.map(({ anecdote, votes, index }) => (
        <div key={`${anecdote}-${index}`}>
          <p>{anecdote}</p>
          <p>has {votes} votes</p>
          <button onClick={() => voteFor(index)}>Vote</button>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList