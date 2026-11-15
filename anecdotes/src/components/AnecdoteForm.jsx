import useAnecdoteStore from '../store'

const AnecdoteForm = () => {
  const addAnecdote = useAnecdoteStore((state) => state.addAnecdote)

  const handleSubmit = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value.trim()

    if (content.length === 0) {
      return
    }

    try {
      await addAnecdote(content)
      event.target.reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <input name="anecdote" />
      <button type="submit">Add anecdote</button>
    </form>
  )
}

export default AnecdoteForm