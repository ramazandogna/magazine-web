//react
import { useContext } from 'react'
//context
import { UserContext } from '../context/userContext'

function Dashboard() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const { user }: any = useContext(UserContext)
  console.log(user)
  return (
    <div>
      <h1>Hi, welcome to dashboard</h1>
      your infos:
      <ul>
        <li>id: {user.id}</li>
        <li>email: {user.email}</li>
        <li>name: {user.name}</li>
      </ul>
    </div>
  )
}

export default Dashboard
