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
  if (!contents)
    return (
      <div className="fixedCenter text-16px flex items-center justify-center">
        Loading...
      </div>
    )
  return (
    <div className="globalSection gap-12px flex">
      {contents &&
        user &&
        contents.map((content: sendData, i: number) => (
          <div
            className="globalpadding globalrounded text-bkg bg-secondary relative"
            key={i}
          >
            <Link to={`/content/${content._id}`}>
              <p className="top-10px right-10px absolute"> {i + 1}</p>
              <img
                src={content.image?.base64Image}
                alt={content?.image?.file?.name}
                className="max-w-250px mt-18px globalrounded h-auto transition-all hover:scale-125"
              />
            </Link>
          </div>
        ))}
    </div>
  )
}

export default ElementsPage
