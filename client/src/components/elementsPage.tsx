import { useContext, useEffect } from 'react'
import { ContentContext } from '../context/contentContext'
import { UserContext } from '../context/userContext'
import axios from 'axios'

const ElementsPage = () => {
  const { contents, setContents } = useContext(ContentContext)
  const { user } = useContext(UserContext)

  useEffect(() => {
    // Eğer user mevcut değilse, profil bilgilerini al
    if (!contents) {
      axios.get('/data/getcontents').then(({ data }) => {
        setContents(data)
      })
    }
  }, [contents, setContents])

  if (!contents) return <div>Loading...</div>
  return (
    <div className="flex gap-4px">
      {contents &&
        user &&
        contents.map((content, i) => (
          <div key={i}>
            <h2>Content count {content.i}</h2>
            <p>HTML: {content.html}</p>
            <p>CSS: {content.css}</p>
            {/* <p>Image: {content.image}</p> */}
            <img
              src={content.image.base64Image}
              alt={content?.image?.file?.name}
              className="max-w-250px h-auto"
            />
            <p>User: {content.user.name}</p>
            <p>User: {content.user.email}</p>
            <p>User: {content.user.id}</p>
          </div>
        ))}
    </div>
  )
}

export default ElementsPage
