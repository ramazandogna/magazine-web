import { defineConfig, presetUno } from 'unocss'
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
      secondary: 'rounded-6px p-16px border-primary border-1px bg-secondary',
      fixedCenter: 'fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 inset-0',
      headerHeight: 'h-3rem',
      globalNav:
        'z-9999 w-100vw headerHeight py-0.25rem bg-secondary/40 fixed left-0 top-0  flex items-center shadow-xl',
      globalSection: 'mt-[4.5rem] globalWidth box-border',
      globalWidth: '2xl:w-1380px xl:w-1200px lg:w-960px w-100% relative m-auto px-1rem',
      globalPadding: 'p-12px',
      globalRounded: 'rounded-8px',
      globalGap: 'gap-16px'
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
    })
  ]
})
