import ReactDOM from 'react-dom/client'
import App from './routes'
//unocss
import 'virtual:uno.css' //import
import '@unocss/reset/eric-meyer.css'
//router
import { BrowserRouter } from 'react-router-dom'
//styles
import './assets/style.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <div className="text-text bg-bkg text-14px absolute left-0 right-0 top-0 font-[Space_Mono] tracking-tight">
      <div className="text-10px fixed bottom-4 right-4 text-green-200 hover:underline">
        BETA SÜRÜMÜ
      </div>
      <App />
    </div>
  </BrowserRouter>
)
