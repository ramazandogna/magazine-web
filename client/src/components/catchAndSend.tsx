import { useEffect, useState } from 'react'
import Monaco from './monacoEditor'

function CatchAndSend() {
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
  return (
    <div>
      {data && (
        <>
          <div className=" gap-16px flex flex-col justify-between">
            <Monaco
              defaultLanguage="html"
              defaultValue={data.clickedElement.outerHTML}
              theme="light"
            />
            <Monaco
              defaultLanguage="css"
              defaultValue={'.ramazan{color:red;}'}
              theme="vs-dark"
            />
          </div>
          <button>{data.status === 'finished' ? 'Finished' : 'NotFinished'}</button>
        </>
      )}
    </div>
  )
}

export default CatchAndSend
