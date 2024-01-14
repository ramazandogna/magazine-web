import { Link, useNavigate } from 'react-router-dom'
import { UserContext } from '../context/userContext'
import { useContext, useEffect, useState } from 'react'
import axios from 'axios'

function Navbar() {
  const { user, setUser } = useContext(UserContext)
  const [haveUser, setHaveUser] = useState<boolean>(false)
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await axios.get('/auth/logout')
      setUser(null)
      setHaveUser(false)
    } catch (error) {
      console.log(error)
    }
    navigate('/login')
  }

  useEffect(() => {
    if (user) {
      setHaveUser(true)
    } else {
      setHaveUser(false)
    }
  }, [user])

  if (haveUser) {
    return (
      <nav className="gap-8px bg-secondary flex w-full items-center justify-center p-4">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin</Link>
        <div className="cursor-pointer text-red-400 underline" onClick={handleLogout}>
          Logout
        </div>
      </nav>
    )
  }
  return (
    <nav className="gap-8px bg-secondary flex items-center justify-center p-4 ">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  )
}

export default Navbar
