//react
import { useContext, useEffect, useState } from 'react'
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
  const [loading, setLoading] = useState(true)

  const { user } = useContext(UserContext)

  useEffect(() => {
    // Eğer user mevcut değilse, profil bilgilerini al
    axios
      .get('/data/getcontents')
      .then(({ data }) => {
        setContents(data)
        setLoading(false)
      })
      .catch(error => {
        console.error('Error fetching contents:', error)
        setLoading(false)
      })
  })

  if (loading) {
    return (
      <div className="fixedCenter text-16px flex items-center justify-center">
        Loading...
      </div>
    )
  }
  return (
    <div className="globalSection min-h-100vh ">
      <h2 className="globalh2 mt-40px mb-32px">Element Library:</h2>
      <div className="gap-16px flex h-full w-full flex-wrap">
        {contents &&
          user &&
          contents.map((content: sendData, i: number) => (
            <div className="animate-fade-in duration-250 hover:shadow-text animate-duration-250 h-200px globalRounded text-bkg  bg-red   relative flex w-1/4 grow items-center justify-center shadow-xl hover:scale-110 hover:shadow-2xl">
              <Link key={i} to={`/content/${content._id}`}>
                <p className="bg-text py-4px px-8px globalRounded top-10px left-10px absolute">
                  {i + 1}
                </p>
                <img
                  src={content.image?.base64Image}
                  alt={content?.image?.file?.name}
                  className="w-100% h-200px globalRounded flex w-full items-center object-cover "
                />
              </Link>
            </div>
          ))}
      </div>
    </div>
  )
}

export default ElementsPage
