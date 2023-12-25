import ReactDOM from 'react-dom/client'
import App from './routes'
//unocdd
import 'virtual:uno.css' //import
import '@unocss/reset/normalize.css' //reset settings
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
)
