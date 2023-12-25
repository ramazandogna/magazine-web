import { Link } from 'react-router-dom'

function Navbar() {
  return (
    <nav>
      <ul className="flex gap-4px items-center justify-center list-none">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/login">Login</Link>
        </li>
        <li>
          <Link to="/register">Register</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
