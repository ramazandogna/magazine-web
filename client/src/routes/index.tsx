//basic imports
import { Routes, Route } from 'react-router-dom'
import axios from 'axios'
//components
import Navbar from '../components/navbar'
//toast
import { Toaster } from 'react-hot-toast'
//context
import { UserContextProvider } from '../context/userContext'
import { ContentContextProvider } from '../context/contentContext'
//pages
import Home from '../pages/home'
import Login from '../pages/auth/login'
import Register from '../pages/auth/register'
import Profile from '../pages/profile'
import Admin from '../pages/admin'
import PageNotFound from '../pages/*'
import ElementDetails from '../pages/element/elementDetail'
import ElementsPage from '../pages/element/elements'
import SendElementPage from '../pages/element/elementSend'

axios.defaults.baseURL = 'http://localhost:8000'
axios.defaults.withCredentials = true

const AppRoutes = () => {
  return (
    <UserContextProvider>
      <ContentContextProvider>
        <Toaster position="bottom-right" toastOptions={{ duration: 2000 }} />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/content/:contentId" element={<ElementDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/elements" element={<ElementsPage />} />
          <Route path="/sendelement" element={<SendElementPage />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </ContentContextProvider>
    </UserContextProvider>
  )
}

export default AppRoutes
