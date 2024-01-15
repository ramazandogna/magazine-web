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
      const { data } = await axios.post('/auth/login', {
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
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <h2 className="h2title">Sign in to app</h2>
      <div className=" w-300px">
        <form className="gap-8px flex flex-col" onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input
            className=" mt-4px mb-16px"
            type="email"
            id="email"
            value={data.email}
            onChange={e => setData({ ...data, email: e.target.value })}
          />
          <label htmlFor="password">Password</label>
          <input
            className="  mt-4px mb-16px"
            type="password"
            id="password"
            value={data.password}
            onChange={e => setData({ ...data, password: e.target.value })}
          />
          <button className="" type="submit">
            Sign in
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login
