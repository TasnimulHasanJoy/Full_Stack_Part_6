import { useEffect } from 'react'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import useAnecdoteStore from './store'

const App = () => {
  const setAnecdotes = useAnecdoteStore((state) => state.setAnecdotes)

  useEffect(() => {
    fetch('http://localhost:3001/anecdotes')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Could not fetch anecdotes')
        }

        return response.json()
      })
      .then((anecdotes) => setAnecdotes(anecdotes))
      .catch((error) => console.error(error))
  }, [setAnecdotes])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Notification />
      <Filter />
      <AnecdoteList />
      <AnecdoteForm />
    </div>
  )
}

export default App