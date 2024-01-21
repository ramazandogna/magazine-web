//react
import { useContext, useState, useEffect } from 'react'
//router
import { useParams, useNavigate } from 'react-router-dom'
//context
import { sendData } from '../../types'
import { ContentContext } from '../../context/contentContext'
import { UserContext } from '../../context/userContext'

import axios from 'axios'
import { toast } from 'react-hot-toast'
import Monaco from '../../components/monacoEditor'

function ElementDetails() {
  const [contentIsYours, setContentIsYours] = useState(false)
  const [updatedHtml, setUpdatedHtml] = useState('')
  const [updatedCss, setUpdatedCss] = useState('')

  const { contentId } = useParams()
  const { contents, setContents } = useContext(ContentContext)
  const { user } = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    const selectedContent = contents?.find(
      (content: sendData) => content._id === contentId
    )
    setContentIsYours(selectedContent?.user.id === user?.id)

    // Set initial values for updatedHtml and updatedCss
    setUpdatedHtml(selectedContent?.html || '')
    setUpdatedCss(selectedContent?.css || '')
  }, [contents, contentId, user])

  const selectedContent = contents?.find((content: sendData) => content._id === contentId)

  const handleUpdate = async () => {
    try {
      const updatedContent = await axios.put(`/data/updateelement/${contentId}`, {
        html: updatedHtml,
        css: updatedCss,
        image: { base64Image: 'Updated Image', name: 'Updated Image Name' }
      })

      if (updatedContent.data.updatedData) {
        setContents((prevContents: sendData[] | null) => {
          if (prevContents) {
            return prevContents.map((content: sendData) =>
              content._id === contentId ? updatedContent.data.updatedData : content
            )
          }
          return null
        })
        toast.success('Content updated successfully')
      }

      // Sayfa yeniden yönlendirmesi Promise içinde
      await new Promise(resolve => setTimeout(resolve, 0))

      navigate(`/content/${contentId}`)
    } catch (error) {
      console.error(error)
      toast.error('Error updating content')
    }
  }

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/data/deleteelement/${contentId}`)

      if (response.data.deletedData) {
        setContents(prevContents => {
          if (!prevContents) {
            return null
          }
          return prevContents.filter(content => content._id !== contentId)
        })
        toast.success('Content deleted successfully')
        navigate('/elements') // or redirect to another page after deletion
      } else {
        toast.error('Error deleting content')
      }
    } catch (error) {
      console.error(error)
      toast.error('Error deleting content')
    }
  }

  if (!selectedContent) return <div>Loading...</div>

  return (
    <div className="globalSection  h-100vh">
      <div className="gap-16px h-30vh flex flex-col md:flex-row ">
        <div className="bg-secondary/30 globalPadding flex flex-1 items-center justify-center">
          <img
            src={selectedContent?.image ?? ''}
            alt={selectedContent?.image ?? ''}
            className="max-w-450px"
          />
        </div>
        <div className="globalPadding bg-secondary/30 relative ml-auto flex-1">
          <h2>Elementi yakalayan kişinin bilgileri</h2>
          <p>{selectedContent?.user.name}</p>
          <p>{selectedContent?.user.email}</p>
          <p>{selectedContent?.user.id}</p>
          {contentIsYours && (
            <div className="gap-16px absolute bottom-2 left-1/2 flex  -translate-x-1/2 items-center">
              <div
                className="globalButton text-14px bg-green-800 hover:bg-green-600"
                onClick={handleUpdate}
              >
                Kaydet
              </div>
              <button className="globalButton text-14px" onClick={handleDelete}>
                Delete
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex justify-between">
        <label className="flex flex-1 flex-col items-center justify-end text-center">
          <h2 className="globalh2 my-12px">HTML:</h2>
          <Monaco
            defaultLanguage="html"
            defaultValue={selectedContent?.html || ''}
            theme="vs-dark"
            onChange={value => setUpdatedHtml(value || '')}
            width={'50vh'}
            height={'44vh'}
          />
        </label>
        <label className="flex flex-1 flex-col items-center justify-end text-center">
          <h2 className="globalh2">CSS:</h2>
          <Monaco
            defaultLanguage="css"
            defaultValue={selectedContent?.css || ''}
            theme="vs-dark"
            onChange={value => setUpdatedCss(value || '')}
            width={'50vh'}
            height={'44vh'}
          />
        </label>
      </div>
    </div>
  )
}

export default ElementDetails
