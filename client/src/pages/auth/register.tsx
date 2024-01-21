import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
//types
import type { userRegister } from '../../types'
//toast
import { toast } from 'react-hot-toast'

function Register() {
  //states
  const [data, setData] = useState<userRegister>({
    name: '',
    email: '',
    password: '',
    activateKey: '',
    admin: false
  })

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate()

  //fonk
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { name, email, password, activateKey } = data // Add 'activateKey' here
    try {
      const { data } = await axios.post('/auth/register', {
        name,
        email,
        password,
        activateKey,
        admin: false
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({
          email: '',
          name: '',
          password: '',
          activateKey: '',
          admin: false
        })
        toast.success("You're registered successfully")
        navigate('/login')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-100vh w-100vw gradient-background flex flex-col items-center justify-center">
      <h1 className="gradient-background mb-8px duration-400 globalRounded globalPadding text-22px font-600 hover:scale-104 flex cursor-pointer flex-col border shadow-md transition-all hover:shadow-2xl">
        <span className="text-primary duration-400 hover:text-bkg transition-all hover:underline">
          Element
        </span>
        <br />
        <span className="text-bkg ml-4px hover:text-secondary duration-400 transition-all hover:underline">
          Yakalayıcı
        </span>
      </h1>
      <form
        className="animate-fade-in-up bg-bkg globalRounded p-48px w-50vh max-h-60vh flex flex-col tracking-normal"
        onSubmit={handleSubmit}
      >
        <h2 className="globalh2">Kayıt Ol</h2>
        <div className="text-15px text-text/60 mb-24px">
          Aşağıdaki bilgileri doğru girerek beta sisteme kayıt olabilirsin. Beta sistemde
          kaybedilen şifreler ve kullanıcı adları geri getirilemez. Kayıt olurken bu
          uyarılara dikkat edilmelidir.{' '}
        </div>
        <input
          type="text"
          className="p-16px mb-24px globalRounded border-none  focus:bg-gray-200 focus:outline-none "
          placeholder="Adın"
          id="name"
          value={data.name}
          onChange={e => setData({ ...data, name: e.target.value })}
        />
        <input
          type="email"
          id="email"
          className="p-16px mb-24px globalRounded border-none  focus:bg-gray-200 focus:outline-none "
          placeholder="E-posta"
          value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })}
        />
        <input
          type="password"
          id="password"
          className="p-16px mb-24px globalRounded border-none  focus:bg-gray-200 focus:outline-none "
          placeholder="Şifre"
          value={data.password}
          onChange={e => setData({ ...data, password: e.target.value })}
        />
        <div className="text-12px mb-24px pl-2px opacity-60">
          Zaten bir hesaba <br /> sahip misin?
          <Link className="mx-8px  text-blue-400 underline" to={'/login'}>
            Giriş yap
          </Link>
        </div>
        <button className="globalButton hover:text-text" type="submit">
          Kayıt Ol
        </button>
      </form>
    </div>
  )
}

export default Register
