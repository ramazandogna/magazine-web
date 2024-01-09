import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
//types
import type { userLogin } from '../../types'
//toast
import { toast } from 'react-hot-toast'

function Login() {
  //states
  const [data, setData] = useState<userLogin>({
    email: '',
    password: ''
  })

  //nav
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate()
  //fonk
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = data
    try {
      const { data } = await axios.post('/login', {
        email,
        password
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({
          email: '',
          password: ''
        })
        toast.success("You're logged in successfully")
        navigate('/profile')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-100vh w-100vw flex flex-col items-center justify-center">
      <h1 className="text-31px">Login</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
