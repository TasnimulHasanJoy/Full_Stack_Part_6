import { useQuery } from '@tanstack/react-query'

const getAnecdotes = async () => {
  const response = await fetch('http://localhost:3001/anecdotes')

  if (!response.ok) {
    throw new Error('Could not fetch anecdotes')
  }

  return response.json()
}

const useAnecdotes = () =>
  useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: false
  })

export default useAnecdotes
