import { useContext, useEffect, useState } from 'react'
import Monaco from '../../components/monacoEditor'
import { DataObject, sendData } from '../../types'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'

function ElementSend() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [isUser, setIsUser] = useState(false)
  const [dataExtension, setDataExtension] = useState<DataObject | undefined>()
  const [customEv, setCustomEv] = useState<string | undefined>()
  const [data, setData] = useState<sendData>({
    _id: null,
    map: () => null,
    image: null,
    html: '',
    css: '',
    user: {
      name: '',
      email: '',
      id: 0
    }
  })
  useEffect(() => {
    if (dataExtension) {
      setData(prevData => ({
        ...prevData,
        html: dataExtension.clickedElement.outerHTML || '',
        css: dataExtension.elementInfos || '',
        image: dataExtension.clickedElement.screenshots || ''
      }))
    }
  }, [dataExtension])

  useEffect(() => {
    // Event dinleme fonksiyonu
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCustomEvent = (event: any) => {
      // Event içeriğini kontrol et
      if (event.detail) {
        console.log('Custom event received:', event.detail)
        setDataExtension(event.detail)
        setCustomEv(event.currentTarget.location.href)
        console.log('href:', customEv)
        // İşlemlerinizi burada gerçekleştirin
      }
    }

    // Event dinleme işlemi
    window.addEventListener('send-element-to-dom', handleCustomEvent)

    // useEffect temizleme fonksiyonu
    return () => {
      // Component kaldırıldığında event dinleme işlemini kaldır
      window.removeEventListener('send-element-to-dom', handleCustomEvent)
    }
  }, [customEv, dataExtension])

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { html, css, user } = data

    try {
      if (user) {
        const { data } = await axios.post('/data/submitelement', {
          html,
          css,
          image: dataExtension?.clickedElement.screenshots,
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          }
        })
        console.log(data) // Sunucudan gelen yanıtı kontrol et

        if (data.error) {
          toast.error(data.error)
        } else {
          // Reset form data after successful submission
          setData(prevData => ({
            ...prevData,
            html: '',
            css: '',
            image: null,
            user: data.user,
            map: () => null
          }))

          toast.success("You're sent successfully")

          navigate('/elements')
        }
      }
    } catch (error) {
      console.log(error)
      toast.error('An error occurred while submitting')
    }
  }

  const handleButtonClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      await handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>)
    } catch (error) {
      console.log(error)
      toast.error('An error occurred while submitting')
    }
  }

  useEffect(() => {
    if (user) {
      setIsUser(true)
      setData({
        ...data,
        user: {
          name: user.name,
          email: user.email,
          id: user.id
        }
      })
    } else {
      setIsUser(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user])

  console.log(isUser)
  console.log(data)

  return (
    <div className="globalSection  bg-secondary/40  h-100vh gap-16px ">
      <div className="bg-secondary/40 p-32px mb-16px h-200px max-h-200px w-90% mx-auto ">
        <div className="bg-bkg h-100% w-80% m-auto flex items-center justify-center overflow-hidden">
          <img
            className="globalRounded w-full object-contain"
            src={dataExtension?.clickedElement.screenshots}
            alt={customEv}
          />
        </div>
      </div>

      {!dataExtension && (
        <p className="my-4px">
          Eklenti penceresini açarak Element Yakalayıcı uygulamasının nasıl kullanıldığını
          öğrenebilirsin.!!
        </p>
      )}

      {dataExtension?.clickedElement.outerHTML && dataExtension?.elementInfos && (
        <div key={data.html + data.css} className="flex w-full flex-col justify-between">
          <div className="flex w-full justify-between">
            <Monaco
              defaultLanguage="html"
              defaultValue={data.html || ''}
              theme="light"
              height="40vh"
              width="35vw"
              onChange={value =>
                setData(prevData => ({ ...prevData, html: value || '' }))
              }
            />
            <Monaco
              defaultLanguage="css"
              defaultValue={data.css || ''}
              theme="vs-dark"
              height="40vh"
              width="35vw"
              onChange={value => setData(prevData => ({ ...prevData, css: value || '' }))}
            />
          </div>
          <div className="mt-10px flex justify-center">
            <button className="globalButton" onClick={handleButtonClick}>
              Kaydet
            </button>
          </div>
        </div>
      )}

      <p
        className={` ${dataExtension?.status ? '-translate-x-50% text-18px fixed bottom-0 left-1/2 text-green-800' : '-translate-x-50% text-18px text-primary fixed bottom-0 left-1/2 '}`}
      >
        Status:{' '}
        {dataExtension?.status
          ? `${dataExtension?.status} - move the mouse over the button`
          : 'There is no any element in data'}
      </p>
    </div>
  )
}

export default ElementSend
