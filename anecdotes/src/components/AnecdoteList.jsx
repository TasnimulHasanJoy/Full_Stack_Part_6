import useAnecdoteStore from '../store'
import useNotificationStore from '../notificationStore'

const AnecdoteList = () => {
  const anecdotes = useAnecdoteStore((state) => state.anecdotes)
  const filter = useAnecdoteStore((state) => state.filter)
  const voteFor = useAnecdoteStore((state) => state.voteFor)
  const showNotification = useNotificationStore(
    (state) => state.showNotification
  )

  const handleVote = async (anecdote) => {
    try {
      await voteFor(anecdote.id)
      showNotification(`You voted '${anecdote.content}'`)
    } catch (error) {
      console.error(error)
    }
  }

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
          <p>
            has {anecdote.votes}{' '}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </p>
        </div>
      ))}
    </div>
  )
}

export default AnecdoteList