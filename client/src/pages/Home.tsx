import Introducions from '../pages/Home/introducions'

function Home() {
  return (
    <div className="globalSection relative h-full">
      <div className="relative">
        <div className="gradient-background z-999 fixed inset-0">
          <Introducions />
        </div>
      </div>
    </div>
  )
}

export default Home
