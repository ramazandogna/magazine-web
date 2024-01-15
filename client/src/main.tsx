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
    <div className="text-text bg-bkg  text-14px fixed inset-0 font-[Space_Mono]">
      <App />
    </div>
  </BrowserRouter>
)
