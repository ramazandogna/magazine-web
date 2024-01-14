//react
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
//contet
import { ContentContext } from '../context/contentContext'
import { UserContext } from '../context/userContext'
//axios
import axios from 'axios'
//types
import { sendData } from '../types'

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

  console.log(contents)
  if (!contents) return <div>Loading...</div>
  return (
    <div className="gap-4px flex">
      {contents &&
        user &&
        contents.map((content: sendData, i: number) => (
          <div key={i}>
            <Link to={`/content/${content._id}`}>
              <h2>Content count {i + 1}</h2>
              <p>HTML: {content.html}</p>
              <p>CSS: {content.css}</p>
              {/* <p>Image: {content.image}</p> */}
              <img
                src={content.image?.base64Image}
                alt={content?.image?.file?.name}
                className="max-w-250px h-auto"
              />
              <p>User: {content.user.name}</p>
              <p>User: {content.user.email}</p>
              <p>User: {content.user.id}</p>
            </Link>
          </div>
        ))}
    </div>
  )
}

export default ElementsPage
