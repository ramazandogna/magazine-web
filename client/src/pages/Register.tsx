import { useState } from 'react'
//types
import type { userRegister } from '../types'

function Register() {
  //states
  const [user, setUser] = useState<userRegister>({
    name: '',
    userName: '',
    email: '',
    password: ''
  })

  //fonk
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
  }

  return (
    <div className="h-100vh w-100vw flex flex-col items-center justify-center">
      <h1>Register</h1>
      <form className="flex flex-col" onSubmit={handleSubmit}>
        <label htmlFor="username">Name</label>
        <input
          type="text"
          id="name"
          value={user.name}
          onChange={e => setUser({ ...user, name: e.target.value })}
        />
        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={user.userName}
          onChange={e => setUser({ ...user, userName: e.target.value })}
        />
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
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register
