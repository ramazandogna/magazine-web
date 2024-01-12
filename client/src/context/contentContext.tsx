// import { createContext, useState, useEffect } from 'react'
// import axios from 'axios'
// import {  UserContextProps, GetContentProps } from '../types'

// export const UserContext = createContext<UserContextProps>({ user: null, setUser: () => null })
// export function UserContextProvider({ children }: { children: React.ReactNode }) {
//   const [content, setContent] = useState<GetContentProps | null>(null)
//   useEffect(() => {
//     if (!content) {
//       axios.get('/data/profile').then(({ data }) => {
//         setUser(data)
//       })
//     }
//   })
//   return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>
// }
