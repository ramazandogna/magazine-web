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

  return (
    <nav className="globalNav text-15px text-secondary ">
      <div className="globalWidth flex items-center">
        <Link
          className="text-22px rounded-6px text-bkg gradient-background p-8px font-bold transition-all duration-500"
          to="/"
        >
          Home
        </Link>

        {haveUser ? (
          <div className="globalGap ml-auto hidden items-center sm:flex">
            <Link className="" to="/elements">
              Elements
            </Link>
            <Link className="text-primary globalBorder" to="/sendelement">
              Catch Your Element
            </Link>
            <Link className="" to="/profile">
              Profile
            </Link>
            <Link
              className="underline-primary transition-all hover:underline"
              to="/about"
            >
              About
            </Link>
            <Link className="" to="/admin">
              Admin
            </Link>
            <div
              className="text-primary  globalBorder cursor-pointer"
              onClick={handleLogout}
            >
              Logout
            </div>
          </div>
        ) : (
          <div className="globalGap ml-auto hidden items-center sm:flex">
            <Link
              className="underline-primary transition-all hover:underline"
              to="/about"
            >
              About
            </Link>
            <Link
              className="underline-primary transition-all hover:underline"
              to="/login"
            >
              Login
            </Link>
            <Link
              className="underline-primary transition-all hover:underline"
              to="/register"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
