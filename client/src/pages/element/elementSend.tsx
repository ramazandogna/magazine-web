import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useState } from 'react'
import Monaco from '../../components/monacoEditor'
import { DataObject, imageDataProps, sendData } from '../../types'
import { toast } from 'react-hot-toast'
import axios from 'axios'
import { UserContext } from '../../context/userContext'
import { useNavigate } from 'react-router-dom'
// import SubmitElements from '../../components/elementSubmit'

function ElementSend() {
  const navigate = useNavigate()
  const { user } = useContext(UserContext)
  const [showElement, setShowElement] = useState(false)
  const [isUser, setIsUser] = useState(false)
  const [dataExtension, setDataExtension] = useState<DataObject | undefined>()
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
  const [imageData, setImageData] = useState<imageDataProps>({
    file: null,
    base64Image: '',
    name: ''
  })
  useEffect(() => {
    // Event dinleme fonksiyonu
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCustomEvent = (event: any) => {
      // Event içeriğini kontrol et
      if (event.detail) {
        console.log('Custom event received:', event.detail)
        setDataExtension(event.detail)
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
  }, [])
  console.log(data)

  const isImageFileValid = (file: File): boolean => {
    const allowedExtensions = ['jpg', 'jpeg', 'png']
    const fileNameParts = file.name.split('.')
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase()
    return allowedExtensions.includes(fileExtension)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { html, css, user } = data

    try {
      if (user) {
        const { data } = await axios.post('/data/submitelement', {
          html,
          css,
          image: imageData,
          user: {
            id: user.id,
            email: user.email,
            name: user.name
          }
        })

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

  const handleImageSend: ChangeEventHandler<HTMLInputElement> = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target?.files
    if (file && file.length > 0) {
      const selectedFile = file[0]
      const fileName = file[0].name

      if (isImageFileValid(selectedFile)) {
        const reader = new FileReader()

        reader.onloadend = () => {
          const base64Image = reader.result as string

          setImageData({
            file: selectedFile,
            base64Image,
            name: fileName
          })
          setData(prevData => ({
            ...prevData,
            image: { file: selectedFile, base64Image, name: fileName }
          }))
        }

        reader.readAsDataURL(selectedFile)
      } else {
        alert('Please select a valid (JPG, JPEG, PNG) image file')
        setData(prevData => ({ ...prevData, image: null }))
        e.target.value = ''
      }
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

  return (
    <div className="globalSection h-100vh ">
      Element Yakalayıcı
      {data && showElement && (
        <>
          <div className=" gap-16px mt-16px">
            <label className="mb-2 block text-gray-800">Resim Seç</label>

            <input
              disabled={!isUser}
              accept="image/"
              type="file"
              onChange={handleImageSend}
              className="w-full rounded p-2"
            />
            <div className="flex justify-between">
              <Monaco
                defaultLanguage="html"
                defaultValue={dataExtension?.clickedElement.outerHTML || ''}
                theme="light"
                height="40vh"
                width="44vw"
                onChange={value =>
                  setData(prevData => ({ ...prevData, html: value || '' }))
                }
              />
              <Monaco
                defaultLanguage="css"
                defaultValue={'data?.elementInfos'}
                theme="vs-dark"
                height="40vh"
                width="44vw"
                onChange={value =>
                  setData(prevData => ({ ...prevData, css: value || '' }))
                }
              />
            </div>
            <button className="globalButton" onClick={handleButtonClick}>
              VT'na Kaydet
            </button>
          </div>
        </>
      )}
      <button
        className={` ${showElement ? 'hidden' : 'mt-16px ml-16px'}`}
        onMouseEnter={() => {
          setShowElement(true)
        }}
      >
        Kodu Göster
      </button>
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
