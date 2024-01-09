//basic imports
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
//components
import Navbar from '../components/Navbar'
//toast
import { Toaster } from 'react-hot-toast'
//context
import { UserContextProvider } from '../context/userContext'
//pages
import Home from '../pages/home'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Profile from '../pages/profile'
import Admin from '../pages/adminPanel'
import PageNotFound from '../pages/*'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

const AppRoutes = () => {
  return (
    <UserContextProvider>
      <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </UserContextProvider>
  )
}

export default AppRoutes
