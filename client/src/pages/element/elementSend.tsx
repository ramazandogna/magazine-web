import { useEffect, useState } from 'react'
import Monaco from '../../components/monacoEditor'
import { DataObject } from '../../types'

function ElementSend() {
  const [data, setData] = useState<DataObject>()
  const [showElement, setShowElement] = useState(false)
  useEffect(() => {
    // Event dinleme fonksiyonu
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleCustomEvent = (event: any) => {
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
    <div className="globalSection h-100% ">
      Element Yakalayıcı
      {data && showElement && (
        <>
          <div className=" gap-16px mt-16px  flex justify-between">
            <Monaco
              defaultLanguage="html"
              defaultValue={data?.clickedElement.outerHTML}
              theme="light"
            />
            <Monaco
              defaultLanguage="css"
              defaultValue={'data?.elementInfos'}
              theme="vs-dark"
            />
          </div>
        </>
      )}
      <button
        className={` ${showElement ? 'hidden' : 'mt-16px ml-16px'}`}
        onMouseEnter={() => {
          setShowElement(true)
        }}
      >
        Kodu Göster
      </button>
      <p
        className={` ${data?.status ? '-translate-x-50% text-18px fixed bottom-0 left-1/2 text-green-800' : '-translate-x-50% text-18px text-primary fixed bottom-0 left-1/2 '}`}
      >
        Status:{' '}
        {data?.status
          ? `${data?.status} - move the mouse over the button`
          : 'There is no any element in data'}
      </p>
    </div>
  )
}

export default ElementSend
