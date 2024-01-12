//react
import { useContext, useEffect } from 'react'
//context
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Profile() {
  //consts
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    // Eğer user mevcut değilse, profil bilgilerini al
    if (!user) {
      axios.get('auth/profile').then(({ data }) => {
        setUser(data)
      })
    }
  }, [user, setUser])

  useEffect(() => {
    if (user && user.admin) {
      navigate('/admin')
    }
  }, [user, navigate])

  return (
    <div>
      {user ? (
        <div>
          <h1>Hi, welcome to dashboard</h1>
          <p>Your infos:</p>
          <ul>
            <li>id: {user.id}</li>
            <li>email: {user.email}</li>
            <li>name: {user.name}</li>
            <li>activateKey: {user.activateKey}</li>
          </ul>
        </div>
      ) : (
        <div>Kullanıcı bulunamadı</div>
      )}
    </div>
  )
}

export default Profile
