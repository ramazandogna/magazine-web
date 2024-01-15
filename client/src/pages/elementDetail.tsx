//react
import { useContext, useState, useEffect } from 'react'
//router
import { useParams, useNavigate } from 'react-router-dom'
//context
import { sendData } from '../types'
import { ContentContext } from '../context/contentContext'
import { UserContext } from '../context/userContext'

import axios from 'axios'
import { toast } from 'react-hot-toast'

function ElementDetails() {
  const [contentIsYours, setContentIsYours] = useState(false)
  const [updatedHtml, setUpdatedHtml] = useState('')
  const [updatedCss, setUpdatedCss] = useState('')
  const [isEditable, setIsEditable] = useState(false)
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

  const handleEdit = () => {
    setIsEditable(true)
  }

  const handleCancel = () => {
    setIsEditable(false)
    // Restore initial values when canceling the edit
    setUpdatedHtml(selectedContent?.html || '')
    setUpdatedCss(selectedContent?.css || '')
  }

  if (!selectedContent) return <div>Loading...</div>

  return (
    <div className="globalSection">
      <img
        src={selectedContent?.image?.base64Image}
        alt={selectedContent?.image?.file?.name}
        className="max-w-250px h-auto"
      />
      <h2>{selectedContent?.user.name}</h2>
      <p>{selectedContent?.user.email}</p>
      <p>{selectedContent?.user.id}</p>
      <div className="flex">
        <label>
          HTML:
          {isEditable ? (
            <textarea
              value={updatedHtml}
              onChange={e => setUpdatedHtml(e.target.value)}
            />
          ) : (
            <div>{selectedContent?.html}</div>
          )}
        </label>
        <label>
          CSS:
          {isEditable ? (
            <textarea value={updatedCss} onChange={e => setUpdatedCss(e.target.value)} />
          ) : (
            <div>{selectedContent?.css}</div>
          )}
        </label>
      </div>
      {contentIsYours && (
        <div>
          {isEditable ? (
            <>
              <button onClick={handleUpdate}>Kaydet</button>
              <button onClick={handleCancel}>İptal Et</button>
            </>
          ) : (
            <button onClick={handleEdit}>Düzenle</button>
          )}
          <button className="">Delete</button>
        </div>
      )}
    </div>
  )
}

export default ElementDetails
