import useAnecdoteStore from '../store'
import useNotificationStore from '../notificationStore'

const AnecdoteForm = () => {
  const addAnecdote = useAnecdoteStore((state) => state.addAnecdote)
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  )

  const handleSubmit = async (event) => {
    event.preventDefault()

    const content = event.target.anecdote.value.trim()

    if (content.length === 0) {
      return
    }

    try {
      await addAnecdote(content)
      showNotification(`A new anecdote '${content}' created`)
      event.target.reset()
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Create new</h2>
      <input name="anecdote" />
      <button type="submit">create</button>
    </form>
  )
}

export default AnecdoteForm