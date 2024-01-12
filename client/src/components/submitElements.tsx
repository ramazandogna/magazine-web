import { ChangeEvent, ChangeEventHandler, useContext, useEffect, useState } from 'react'
import { imageDataProps, sendData } from '../types'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { UserContext } from '../context/userContext'

function SubmitElements() {
  const { user } = useContext(UserContext)
  const [isUser, setIsUser] = useState(false)
  const [imageData, setImageData] = useState<imageDataProps>({
    file: null,
    base64Image: '',
    name: ''
  })
  const [data, setData] = useState<sendData>({
    image: null,
    html: '',
    css: '',
    user: {
      name: user?.name,
      email: user?.email,
      id: user?.id
    }
  })

  // resim yükleme
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
          setData({
            html: '',
            css: '',
            image: null,
            user: data.user
          })

          toast.success("You're sent successfully")
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
    const file = e.target.files
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

  console.log(data)

  return (
    <div
      className={
        isUser
          ? 'fixed bottom-0 left-1/2 -translate-x-50%'
          : 'fixed bottom-0 left-1/2 -translate-x-50% cursor-not-allowed'
      }
    >
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md">
        <label className="block mb-2 text-gray-800">Resim Seç</label>
        <input
          disabled={!isUser}
          accept="image/"
          type="file"
          onChange={handleImageSend}
          className="w-full border p-2 rounded"
        />

        <label className="block mb-2 text-gray-800">Metin 1</label>
        <input
          disabled={!isUser}
          type="text"
          value={data.html}
          onChange={e => setData({ ...data, html: e.target.value })}
          className="w-full border p-2 rounded"
        />

        <label className="block mb-2 text-gray-800">Metin 2</label>
        <input
          disabled={!isUser}
          type="text"
          value={data.css}
          onChange={e => setData({ ...data, css: e.target.value })}
          className="w-full border p-2 rounded"
        />
        <button className={isUser ? '' : 'cursor-not-allowed'} disabled={!isUser}>
          Gönder
        </button>
        {!isUser && <p className="text-red-500">Bu özelliği kullanmak için giriş yapmalısınız.</p>}
      </form>
    </div>
  )
}

export default SubmitElements
