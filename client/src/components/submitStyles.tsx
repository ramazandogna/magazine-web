import { ChangeEvent, ChangeEventHandler, useState } from 'react'
import { sendData } from '../types'

function SubmitStyles() {
  const [data, setData] = useState<sendData>({
    image: null,
    html: '',
    css: ''
  })

  // resim yükleme
  const isImageFileValid = (file: File): boolean => {
    const allowedExtensions = ['jpg', 'jpeg', 'png']
    const fileNameParts = file.name.split('.')
    const fileExtension = fileNameParts[fileNameParts.length - 1].toLowerCase()
    return allowedExtensions.includes(fileExtension)
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
          // reader.result, dosyanın base64 verisidir
          const base64Image = reader.result as string

          // Base64 verisini kullanarak önizlemeyi göster
          setData(prevData => ({
            ...prevData,
            image: { file: selectedFile, base64Image, name: fileName }
          }))
        }
        reader.readAsDataURL(selectedFile)
      } else {
        alert('Please select a valid(JPG, JPEG, PNG) image file')
        setData(prevData => ({ ...prevData, image: null }))
        e.target.value = ''
      }
    }
  }

  return (
    <div className=" inset-0 ">
      <div>
        <div>
          <img
            src={data.image?.base64Image}
            style={{ maxWidth: 'auto', maxHeight: '300px' }}
            alt={data.image?.name}
          />
          <div>{data.image?.name}</div>
        </div>
        <div>{data.html}</div>
        <div>{data.css}</div>
      </div>
      <div className="bg-white p-8 rounded shadow-md">
        <div className="flex justify-end">
          <svg
            className="w-6 h-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-gray-800">Resim Seç</label>
          <input type="file" onChange={handleImageSend} className="w-full border p-2 rounded" />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-gray-800">Metin 1</label>
          <input
            type="text"
            value={data.html}
            onChange={e => setData({ ...data, html: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
        <div className="mt-4">
          <label className="block mb-2 text-gray-800">Metin 2</label>
          <input
            type="text"
            value={data.css}
            onChange={e => setData({ ...data, css: e.target.value })}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
    </div>
  )
}

export default SubmitStyles
