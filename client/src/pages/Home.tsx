import {
  useEffect,
  useState
  //  useState
} from 'react'

function Home() {
  const [data, setData] = useState(null)

  useEffect(() => {
    // Event dinleme fonksiyonu
    const handleCustomEvent = event => {
      // Event içeriğini kontrol et
      if (event.detail) {
        console.log('Custom event received:', event.detail)
        setData(event.detail)
        // İşlemlerinizi burada gerçekleştirin
      }
    }

    // Event dinleme işlemi
    window.addEventListener('send-element-to-dom', handleCustomEvent)

    // useEffect temizleme fonksiyonu
    return () => {
      // Component kaldırıldığında event dinleme işlemini kaldır
      window.removeEventListener('send-element-to-dom', handleCustomEvent)
    }
  }, [])
  const [true1, setTrue1] = useState(false)
  const handleTrue = () => {
    setTrue1(true1 === true ? false : true)
  }
  console.log('datadatadatadata:', data)
  return (
    <div className="globalSection">
      <h2>Home</h2>
      {/* <button onClick={}>temizle</button>{' '} */}
      <a href="#" data-href="/?efl—-edit=1">
        X
      </a>
      <button id="123" onClick={handleTrue} disabled={true1}>
        123
      </button>
    </div>
  )
}

export default Home
