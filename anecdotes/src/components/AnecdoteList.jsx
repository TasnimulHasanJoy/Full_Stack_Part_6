import useAnecdoteStore from '../store'

const AnecdoteList = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const votes = useAnecdoteStore((state) => state.votes)
  const voteFor = useAnecdoteStore((state) => state.voteFor)

  return (
    <div>
      {anecdotes.map((anecdote, index) => (
        <div key={`${anecdote}-${index}`}>
          <p>{anecdote}</p>
          <p>has {votes[index]} votes</p>
          <button onClick={() => voteFor(index)}>Vote</button>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList