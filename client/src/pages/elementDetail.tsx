//react
import { useContext, useState, useEffect } from 'react'
//router
import { useParams } from 'react-router-dom'
//context
import { sendData } from '../types'
import { ContentContext } from '../context/contentContext'
import { UserContext } from '../context/userContext'
//components
import UpdateButton from '../components/updateButton'
import DeleteButton from '../components/deleteButton'

function ElementDetails() {
  const [contentIsYours, setContentIsYours] = useState(false)
  const { contentId } = useParams()
  const { contents } = useContext(ContentContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    // Use optional chaining to avoid errors if selectedContent or user is undefined
    const selectedContent = contents?.find(
      (content: sendData) => content._id === contentId
    )

    // Check if the content belongs to the user
    setContentIsYours(selectedContent?.user.id === user?.id)
  }, [contents, contentId, user])

  if (!contents) return <div>Loading...</div>

  const selectedContent = contents.find((content: sendData) => content._id === contentId)

  if (!selectedContent) return <div>Loading...</div>

  return (
    <div>
      <img
        src={selectedContent?.image?.base64Image}
        alt={selectedContent?.image?.file?.name}
        className="max-w-250px h-auto"
      />
      <h2>{selectedContent?.user.name}</h2>
      <p>{selectedContent?.user.email}</p>
      <p>{selectedContent?.user.id}</p>
      <div className="flex">
        <p className="w-1/2">HTML: {selectedContent?.html}</p>
        <p className="w-1/2">CSS: {selectedContent?.css}</p>
      </div>
      {contentIsYours && (
        <div>
          <UpdateButton />
          <DeleteButton />
        </div>
      )}
    </div>
  )
}

export default ElementDetails
