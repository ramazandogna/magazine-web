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
    <div className="globalSection ">
      {user ? (
        <div className="globalGap flex flex-col">
          <h1>Hi, welcome to dashboard</h1>
          <p className="text-22px my-12px underline">Your infos:</p>
          <ul className="globalGap flex flex-col">
            <li>id: {user.id}</li>
            <li>email: {user.email}</li>
            <li>name: {user.name}</li>
            <li>
              activateKey:{' '}
              {user.activateKey
                ? `${user.activateKey}`
                : 'Aktif bir aktivasyon kodunuz yok'}
            </li>
            <li>
              isAdmin:
              {user.admin ? 'Admin' : 'Kullanıcı'}
            </li>
          </ul>
        </div>
      ) : (
        <div>Kullanıcı bulunamadı</div>
      )}
    </div>
  )
}

export default Profile
