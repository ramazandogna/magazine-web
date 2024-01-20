import { useContext, useEffect, useState } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Profile() {
  const { user, setUser } = useContext(UserContext)
  const navigate = useNavigate()
  const [showId, setShowId] = useState(false)

  useEffect(() => {
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

  const toggleIdVisibility = () => {
    setShowId(!showId)
  }

  return (
    <div className="globalSection h-100vh">
      {user ? (
        <div className="globalGap flex flex-col">
          <h1 className="globalh2">Hi, welcome to your profile</h1>
          <h2 className="text-22px my-12px underline">Your user infos:</h2>
          <table className="globalGap text-16px globalPadding globalRounded text-text bg-secondary/40">
            <tbody className="globalPadding">
              <tr>
                <td
                  className="gap-8px cursor-grab items-center p-4"
                  onClick={toggleIdVisibility}
                >
                  ID{' '}
                  <span className="text-12px">
                    (ID değerini görüntülemek için tıkla):
                  </span>
                </td>
                <td className={`cursor-pointer ${showId ? 'block' : 'hidden'}`}>
                  {user.id}
                </td>
              </tr>
              <tr>
                <td className="p-4">Email:</td>
                <td className="p-4">{user.email}</td>
              </tr>
              <tr>
                <td className="p-4">Name:</td>
                <td className="p-4">{user.name}</td>
              </tr>
              <tr>
                <td className="p-4">Activate Key:</td>
                <td className="p-4">
                  {user.activateKey
                    ? `${user.activateKey}`
                    : 'Beta sürümünde activate key gerekli değildir'}
                </td>
              </tr>
              <tr>
                <td className="p-4">isAdmin:</td>
                <td className="p-4">{user.admin ? 'Admin' : 'Kullanıcı'}</td>
              </tr>
            </tbody>
          </table>
          <h2 className="text-22px my-12px underline">Your favorite styles:</h2>
          <div className="bg-secondary/40 globalPadding globalRounded">
            This is test version. <br /> You can't see your favorite styles yet. <br />{' '}
            :'(
          </div>
        </div>
      ) : (
        <div>Kullanıcı bulunamadı</div>
      )}
    </div>
  )
}

export default Profile
