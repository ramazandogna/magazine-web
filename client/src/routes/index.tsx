//basic imports
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
//components
import Navbar from '../components/Navbar'
//pages
import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
//toast
import { Toaster } from 'react-hot-toast'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

const AppRoutes = () => {
  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
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
