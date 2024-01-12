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
  image: {
    file: File | null
    base64Image: string
    name: string
  } | null
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

export type imageDataProps = {
  file: File | null
  base64Image: string
  name: string
}

//context props
//getUser
export interface UserContextProps {
  user: userTypes | null
  setUser: React.Dispatch<React.SetStateAction<userTypes | null>>
}
export interface ContentContextProps {
  contents: sendData | null
  setContents: React.Dispatch<React.SetStateAction<sendData | null>>
}

// // getContent
// export interface GetContentProps {
//   HTML: string
//   CSS: string
//   image: string
//   author?: string
//   contentTime?: Date
// }
