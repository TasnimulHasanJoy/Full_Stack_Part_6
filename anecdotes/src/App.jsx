import useAnecdoteStore from './store'

const App = () => {
  const anecdote = useAnecdoteStore(
    (state) => state.anecdotes[state.selected]
  )
  const votes = useAnecdoteStore(
    (state) => state.votes[state.selected]
  )
  const vote = useAnecdoteStore((state) => state.vote)
  const nextAnecdote = useAnecdoteStore(
    (state) => state.nextAnecdote
  )
  const addAnecdote = useAnecdoteStore(
    (state) => state.addAnecdote
  )

  const handleSubmit = (event) => {
    event.preventDefault()

    const newAnecdote = event.target.anecdote.value.trim()

    if (newAnecdote.length > 0) {
      addAnecdote(newAnecdote)
      event.target.reset()
    }
  }

  return (
    <main>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>

      <button onClick={vote}>Vote</button>
      <button onClick={nextAnecdote}>Next anecdote</button>

      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <input name="anecdote" />
        <button type="submit">Add anecdote</button>
      </form>
    </main>
  )
}

export default App