//contexts
import { useContext } from 'react'
import { UserContext } from '../context/userContext'

const Admin = () => {
  const { user } = useContext(UserContext)

  if (!user || !user.admin) {
    return <div className="globalSection">Admin sayfasına erişim yetkiniz yok</div>
  }
}

export default Admin
