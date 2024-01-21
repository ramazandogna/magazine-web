import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import axios from 'axios'
//types
import type { userLogin } from '../../types'
//toast
import { toast } from 'react-hot-toast'

function Login() {
  //states
  const [data, setData] = useState<userLogin>({
    email: '',
    password: ''
  })

  //nav
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate()
  //fonk
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password } = data
    try {
      const { data } = await axios.post('/auth/login', {
        email,
        password
      })
      if (data.error) {
        toast.error(data.error)
      } else {
        setData({
          email: '',
          password: ''
        })
        toast.success("You're logged in successfully")
        navigate('/profile')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className="h-100vh w-100vw gradient-background flex flex-col items-center justify-center">
      <h1 className=" gradient-background mb-8px duration-400 globalRounded globalPadding text-22px font-600 hover:scale-104 flex cursor-pointer flex-col shadow-md transition-all hover:shadow-2xl">
        <span className="text-primary duration-400 hover:text-bkg transition-all hover:underline">
          Element
        </span>
        <br />
        <span className="text-bkg ml-4px hover:text-secondary duration-400 transition-all hover:underline">
          Yakalayıcı
        </span>
      </h1>

      <form
        className="animate-fade-in-up bg-bkg globalRounded p-32px w-50vh max-h-60vh flex flex-col tracking-normal"
        onSubmit={handleSubmit}
      >
        <h2 className="globalh2">Giriş Yap</h2>
        <div className="text-15px text-text/60 mb-24px">
          Element Yakalayıcı eklentisinin <span className="underline">beta</span>{' '}
          sistemine giriş yapmak için bilgileri eksiksiz tamamlayın
        </div>
        <input
          className="p-16px mb-24px globalRounded border-none  focus:bg-gray-200 focus:outline-none "
          type="email"
          placeholder="E-Posta"
          id="email"
          value={data.email}
          onChange={e => setData({ ...data, email: e.target.value })}
        />

        <input
          className="p-16px mb-8px globalRounded border-none  focus:bg-gray-200 focus:outline-none "
          type="password"
          id="password"
          placeholder="Şifre"
          value={data.password}
          onChange={e => setData({ ...data, password: e.target.value })}
        />
        <div className="text-12px text-text/50 mb-24px">(Büyük/küçük harfe duyarlı)</div>
        <div className="text-12px mb-24px pl-2px opacity-60">
          Eğer bir hesaba <br /> sahip değilsen,
          <Link className="mx-8px  text-blue-400 underline" to={'/register'}>
            Kaydol
          </Link>
        </div>
        <div className="gap-24px flex">
          <button className="globalButton hover:text-text w-full" type="submit">
            Giriş Yap
          </button>
          <Link to={'/register'}>
            <button className="globalButton  gradient-background w-full">Kaydol</button>
          </Link>
        </div>
      </form>
    </div>
  )
}

export default Login
