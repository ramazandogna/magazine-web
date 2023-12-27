import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
//types
import type { userRegister } from '../types'
//toast
import { toast } from 'react-hot-toast'

function Register() {
  //states
  const [data, setData] = useState<userRegister>({
    name: '',
    email: '',
    password: ''
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate()

  //fonk
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, password } = data
    try {
      const { data } = await axios.post('/register', {
        name,
        email,
        password
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({
          email: '',
          name: '',
          password: ''
        })
        toast.success("You're registered successfully")
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-100vh w-100vw flex flex-col items-center justify-center">
      <h1>Register</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={data.password}
          onChange={e => setData({ ...data, password: e.target.value })}
        />
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
