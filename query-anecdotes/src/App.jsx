import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import useAnecdotes from './hooks/useAnecdotes'
import { useNotify } from './NotificationContext'

const App = () => {
  const queryClient = useQueryClient()
  const { notify } = useNotify()

  const voteAnecdoteMutation = useMutation({
    mutationFn: async (anecdote) => {
      const response = await fetch(
        `http://localhost:3001/anecdotes/${anecdote.id}`,
        {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(anecdote)
        }
      )

      if (!response.ok) {
        throw new Error('Could not save vote')
      }

      return response.json()
    },
    onSuccess: (savedAnecdote) => {
      notify(`anecdote '${savedAnecdote.content}' voted`)
      queryClient.setQueryData(['anecdotes'], (anecdotes) =>
        anecdotes.map((anecdote) =>
          anecdote.id === savedAnecdote.id
            ? {
                ...savedAnecdote,
                votes: Math.max(anecdote.votes, savedAnecdote.votes)
              }
            : anecdote
        )
      )
    }
  })

  const handleVote = (anecdote) => {
    const updatedAnecdote = { ...anecdote, votes: anecdote.votes + 1 }

    queryClient.setQueryData(['anecdotes'], (anecdotes) =>
      anecdotes.map((item) =>
        item.id === anecdote.id ? updatedAnecdote : item
      )
    )

    voteAnecdoteMutation.mutate(updatedAnecdote)
  }

  const result = useAnecdotes()

  const createAnecdoteMutation = useMutation({
    mutationFn: async (content) => {
      const response = await fetch('http://localhost:3001/anecdotes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content })
      })
      const createdAnecdote = await response.json()

      if (!response.ok) {
        throw new Error(createdAnecdote.error || 'Could not create anecdote')
      }

      return createdAnecdote
    },
    onSuccess: (newAnecdote) => {
      notify(`anecdote '${newAnecdote.content}' created`)
      queryClient.setQueryData(['anecdotes'], (anecdotes) => [
        ...anecdotes,
        newAnecdote
      ])
    },
    onError: (error) => {
      notify(error.message)
    }
  })

  if (result.isPending) {
    return <div>Loading anecdotes...</div>
  }

  if (result.isError) {
    return <div>anecdote service not available due to problems in server</div>
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm createAnecdote={createAnecdoteMutation.mutate} />

      {result.data.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default App
