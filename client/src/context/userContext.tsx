import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { userTypes, UserContextProps } from '../types'

export const UserContext = createContext<UserContextProps>({ user: null, setUser: () => null })
export function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<userTypes | null>(null)
  useEffect(() => {
    if (!user) {
      axios.get('/profile').then(({ data }) => {
        setUser(data)
      })
    }
  })
  return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
}
