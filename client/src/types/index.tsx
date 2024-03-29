//register
export type userRegister = {
  name: string
  email: string
  password: string
  activateKey: string
  admin: boolean
}

//login
export type userLogin = {
  email: string
  password: string
}

//user
export type userTypes = {
  id: number
  email: string
  name: string
  activateKey: string
  admin: boolean
}

//send Data
export type sendData = {
  _id: number | null | string
  map(
    arg0: (content: sendData, i: number) => import('react/jsx-runtime').JSX.Element
  ): import('react').ReactNode
  image: string | null
  html: string
  css: string
  user: {
    name: string | undefined
    email: string | undefined
    id: number | undefined
  }
}

export type userDataProps = {
  name: string
  email: string
  id: number
}

//context props
//getUser
export interface UserContextProps {
  user: userTypes | null
  setUser: React.Dispatch<React.SetStateAction<userTypes | null>>
}
export interface ContentContextProps {
  contents: sendData[] | null
  setContents: React.Dispatch<React.SetStateAction<sendData[] | null>>
}

//extension data
export interface ElementInfo {
  class: string
  id: string
  elementTag: string
  styles: {
    [key: string]: string
  }
}

interface ClickedElementData {
  outerHTML: string
  innerHTML: string
  screenshots: string
}

export interface DataObject {
  clickedElement: ClickedElementData
  elementInfos: string
  status: string
}
