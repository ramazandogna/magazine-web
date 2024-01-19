//react
import { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
//contet
import { ContentContext } from '../../context/contentContext'
import { UserContext } from '../../context/userContext'
//axios
import axios from 'axios'
//types
import { sendData } from '../../types'

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

  if (!contents)
    return (
      <div className="fixedCenter text-16px flex items-center justify-center">
        Loading...
      </div>
    )
  return (
    <div className="globalSection ">
      <h2 className="globalh2">Element Library:</h2>
      <div className="gap-12px flex flex-wrap">
        {contents &&
          user &&
          contents.map((content: sendData, i: number) => (
            <div key={i} className="gap-12px flex flex-wrap">
              <div className="globalPadding animate-fade-in animate-duration-150 globalRounded text-bkg bg-secondary relative shadow-xl">
                <Link className="" to={`/content/${content._id}`}>
                  <p className="top-10px right-10px absolute"> {i + 1}</p>
                  <img
                    src={content.image?.base64Image}
                    alt={content?.image?.file?.name}
                    className="w-250px mt-18px globalrounded duration-250 globalRounded h-auto transition-all hover:scale-105 hover:shadow-xl"
                  />
                </Link>
              </div>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ElementsPage
