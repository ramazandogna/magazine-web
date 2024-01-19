import FAQ from './Home/FAQ'
import About from './Home/about'
import Introducions from './Home/introducions'

function Home() {
  return (
    <div className="globalSection w-100vw">
      <About />
      <Introducions />
      <FAQ />
    </div>
  )
}

export default Home
