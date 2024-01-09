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
      await axios.get('/logout')
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
      <nav className="flex p-4 items-center justifyq-center gap-8px ">
        <Link to="/">Home</Link>
        <Link to="/profile">Profile</Link>
        <Link to="/admin">Admin</Link>
        <div className="cursor-pointer underline text-red-400" onClick={handleLogout}>
          Logout
        </div>
      </nav>
    )
  }
  return (
    <nav className="flex p-4 items-center justifyq-center gap-8px ">
      <Link to="/">Home</Link>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </nav>
  )
}

export default Navbar
