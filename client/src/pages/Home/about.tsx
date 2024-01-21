import FAQ from './FAQ'

function About() {
  return (
    <div className=" globalSection">
      <div className="h-89vh gap-12px flex flex-col">
        <div className="bg-secondary globalPadding hover:scale-103  hover:shadow-text duration-350 flex  flex-1 cursor-crosshair items-center justify-between shadow-md shadow-xl transition-all hover:shadow-2xl">
          <div className="text-22px transition-all hover:border hover:border-2 ">
            Beta sürümü, <br /> tamamen ücretsiz
          </div>
          <div className="hover:rotate-5  text-36px font-600 underline transition-all duration-500">
            Ücretsiz
          </div>
        </div>
        <div className="shadow-primary hover:scale-103  duration-350 globalPadding flex flex-1 cursor-crosshair items-center justify-between shadow-md transition-all  hover:shadow-2xl">
          <div className="text-36px font-600 hover:-rotate-5 underline  transition-all duration-500">
            Kodunu al
          </div>
          <div className="text-22px text-end transition-all hover:border hover:border-2">
            Tek tıklamayla <br /> elementlerin kodunu al
          </div>
        </div>
      </div>
      <FAQ />
    </div>
  )
}

export default About
