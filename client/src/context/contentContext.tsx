import { createContext, useState, useEffect } from 'react'
import axios from 'axios'
import { ContentContextProps, sendData } from '../types'

export const ContentContext = createContext<ContentContextProps>({
  contents: null,
  setContents: () => null
})
export function ContentContextProvider({ children }: { children: React.ReactNode }) {
  const [contents, setContents] = useState<sendData[] | null>(null)
  useEffect(() => {
    if (!contents) {
      axios.get('/data/getContents').then(({ data }) => {
        setContents(data)
      })
    }
  })
  return (
    <ContentContext.Provider value={{ contents, setContents }}>
      {children}
    </ContentContext.Provider>
  )
}
