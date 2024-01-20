import { Link } from 'react-router-dom'

function Introducions() {
  return (
    <div className="relative flex h-[90vh] items-center justify-center">
      <div className="max-w-75% duration-400 hover:scale-103  globalRounded bg-bkg/30 globalPadding gap-12px z-1 relative flex flex-col shadow-xl transition-all hover:shadow-2xl">
        <h1 className="gradient-background mb-8px duration-400 globalRounded globalPadding text-22px font-600 hover:scale-104 flex cursor-pointer flex-col text-center shadow-md transition-all hover:shadow-2xl">
          <span className="text-primary duration-400 hover:text-bkg transition-all hover:underline">
            Element
          </span>
          <br />
          <span className="text-bkg ml-4px hover:text-secondary duration-400 transition-all hover:underline">
            Yakalayıcı
          </span>
        </h1>
        <h2 className="mt-24px text-32px text-center">
          Tarayıcının gördüğü web tasarımlarını sen de görebilirsin
        </h2>
        <p className="text-24px text-center">Ücretsiz kütüphane erişimi</p>
        <div className="flex items-center justify-center">
          <Link to={'/register'}>
            <div className="text-bkg text-18px w-360px py-16.5px px-24px bg-primary hover:bg-secondary hover:text-text flex cursor-pointer items-center justify-center uppercase transition-all duration-500">
              Şimdi kayıt ol
            </div>
          </Link>
        </div>
        <p className="text-20px  text-center opacity-50">
          Üstelik test aşamasında tamamen ücretsiz.
        </p>
        <p className="text-12px mt-auto text-center opacity-50">
          *Özelliklere erişim için kayıt gereklidir.
        </p>
      </div>
      <Link
        to={'/about'}
        className=" fixed bottom-5 flex animate-bounce cursor-pointer flex-col  items-center justify-center opacity-80 hover:opacity-100"
      >
        <span className="text-bkg text-14px  mb-10px font-bold ">About</span>
        <svg
          fill="rgb(238 226 222 / var(--un-text-opacity))"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 16 16"
        >
          <path d="M13.34 11.23 6.02 5.42l1.12 9.28 1.73-2.45 2.07 3.69 1.47-.83-2.06-3.69 2.99-.19z" />
          <path d="M5.23 13.9a7.06 7.06 0 1 1 8.61-5.07l-1-.25a6.06 6.06 0 1 0-7.39 4.35z" />
          <path d="M5.15 11A4.4 4.4 0 0 1 7 2.61 4.69 4.69 0 0 1 11.4 7h-1A3.31 3.31 0 0 0 7 3.61a3.4 3.4 0 0 0-1.43 6.49z" />
        </svg>
      </Link>
    </div>
  )
}

export default Introducions
