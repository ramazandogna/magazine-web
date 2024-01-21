import { defineConfig, presetIcons, presetUno } from 'unocss'
import { presetWebFonts } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      text: '#2B2A4C', //text, icon color
      bkg: '#EEE2DE', //body background color
      primary: '#B31312', //first special color
      secondary: '#EA906C' //primary color for background to modals..
    }
  },
  shortcuts: [
    {
      secondary: 'rounded-6px p-16px  bg-secondary',
      globalGradient:
        '[background:linear-gradient(to_right,_#2B2A4C,_#EEE2DE,_#B31312,_#EA906C)]',
      fixedCenter: 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inset-0',
      headerHeight: 'h-3rem',
      globalNav:
        'z-9999 w-100vw headerHeight py-0.25rem backdrop-blur-xl fixed left-0 top-0  flex items-center shadow-md',
      globalSection: 'mt-[4.5rem] globalWidth',
      globalWidth:
        '2xl:w-1380px xl:w-1200px lg:w-960px w-100% box-border m-auto px-1rem 2xl:px-0',
      globalPadding: 'p-12px',
      globalRounded: 'rounded-8px',
      globalGap: 'gap-16px',
      globalh2: 'text-24px font-bold mt-20px mb-12px',
      border: '[border-bottom:1px_solid_black] ',
      globalBorder: 'hover:border-text transition-all hover:border hover:border-b-2',
      globalButton:
        'border-none  text-16px globalRounded bg-primary text-bkg hover:bg-secondary transition-all duration-300 cursor-pointer py-10px text-14px px-24px'
    }
  ],
  presets: [
    presetUno(),
    presetWebFonts({
      provider: 'google',
      fonts: {
        mono: [
          {
            name: 'Space Mono',
            weights: ['400', '600', '700'],
            italic: true
          },
          {
            name: 'monospace',
            provider: 'none'
          }
        ]
      }
    }),
    presetIcons()
  ]
})
