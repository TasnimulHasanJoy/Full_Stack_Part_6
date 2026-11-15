import useAnecdoteStore from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  const voteFor = useAnecdoteStore((state) => state.voteFor)

  const visibleAnecdotes = anecdotes
    .filter((anecdote) =>
      anecdote.content.toLowerCase().includes(filter.toLowerCase())
    )
    .toSorted((first, second) => second.votes - first.votes)

  return (
    <div>
      {visibleAnecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <p>{anecdote.content}</p>
          <p>has {anecdote.votes} votes</p>
          <button onClick={() => voteFor(anecdote.id)}>Vote</button>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList