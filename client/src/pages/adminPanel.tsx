//contexts
import { useContext } from 'react'
import { UserContext } from '../context/userContext'

const Admin = () => {
  const { user } = useContext(UserContext)

  if (!user || !user.admin) {
    return (
      <div className="globalSection">
        <span className="border-primary border-b-2">
          {user?.admin ? 'Admin' : 'Kullanıcı'}
        </span>
        nın admin sayfasına erişim yetkiniz yoktur.
      </div>
    )
  }
}

export default Admin
