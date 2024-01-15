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
      <nav className="globalNav">
        <div className="globalWidth mx-auto flex">
          <Link className="text-22px font-bold" to="/">
            Home
          </Link>
          <div className="globalGap ml-auto flex items-center">
            <Link className="" to="/elements">
              Elements
            </Link>
            <Link className="" to="/sendelement">
              Catch Your Element
            </Link>
            <Link className="" to="/profile">
              Profile
            </Link>
            <Link className="" to="/admin">
              Admin
            </Link>
            <div className="text-primary cursor-pointer underline" onClick={handleLogout}>
              Logout
            </div>
          </div>
        </div>
      </nav>
    )
  }
  return (
    <nav className="globalNav ">
      <div className="globalWidth mx-auto flex">
        <Link className="text-22px font-bold" to="/">
          Home
        </Link>
        <div className="globalGap ml-auto flex items-center">
          <Link className="underline-primary transition-all hover:underline" to="/login">
            Login
          </Link>
          <Link
            className="underline-primary transition-all hover:underline"
            to="/register"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
