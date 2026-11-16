import { createContext, useContext, useEffect, useRef, useState } from 'react'

const NotificationContext = createContext(null)

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState('')
  const timeoutRef = useRef(null)

  const showNotification = (message) => {
    setNotification(message)
    clearTimeout(timeoutRef.current)
    timeoutRef.current = setTimeout(() => setNotification(''), 5000)
  }

  useEffect(() => () => clearTimeout(timeoutRef.current), [])

  return (
    <NotificationContext.Provider value={{ notification, showNotification }}>
      {children}
    </NotificationContext.Provider>
  )
}

export const useNotificationValue = () => useContext(NotificationContext)
