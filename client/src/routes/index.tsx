//basic imports
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
//components
import Navbar from '../components/Navbar'
//pages
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

const AppRoutes = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default AppRoutes
