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

  return (
    <main>
      <h1>Anecdote of the day</h1>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>

      <button onClick={vote}>Vote</button>
      <button onClick={nextAnecdote}>Next anecdote</button>
    </main>
  )
}

export default App