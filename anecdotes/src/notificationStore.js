import { create } from 'zustand'

let notificationTimer

const useNotificationStore = create((set) => ({
  message: '',

  showNotification: (message) => {
    clearTimeout(notificationTimer)
    set({ message })

    notificationTimer = setTimeout(() => {
      set({ message: '' })
    }, 5000)
  }
}))

export default useNotificationStore