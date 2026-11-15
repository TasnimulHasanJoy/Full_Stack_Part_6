import useAnecdoteStore from '../store'

const AnecdoteForm = () => {
  const addAnecdote = useAnecdoteStore((state) => state.addAnecdote)

  const handleSubmit = (event) => {
    event.preventDefault()

    const anecdote = event.target.anecdote.value.trim()

    if (anecdote.length > 0) {
      addAnecdote(anecdote)
      event.target.reset()
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input name="anecdote" />
      <button type="submit">Add anecdote</button>
    </form>
  )
}

export default AnecdoteForm