import { useState } from 'react'
import axios from 'axios'
//types
import type { userLogin } from '../types'

function Login() {
  //states
  const [user, setUser] = useState<userLogin>({
    email: '',
    password: ''
  })

  //fonk
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    axios.get('/')
  }

  return (
    <div className="h-100vh w-100vw flex flex-col items-center justify-center">
      <h1 className="text-31px">Register</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={user.email}
          onChange={e => setUser({ ...user, email: e.target.value })}
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={user.password}
          onChange={e => setUser({ ...user, password: e.target.value })}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login
