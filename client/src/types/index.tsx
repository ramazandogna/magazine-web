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
}

export interface UserContextProps {
  user: userTypes | null
  setUser: React.Dispatch<React.SetStateAction<userTypes | null>>
}
