import { defineConfig, presetUno } from 'unocss'
import { presetWebFonts } from 'unocss'

export default defineConfig({
  theme: {
    colors: {
      bkg: '#EEEEEE', //text, icon color
      text: '#222831', //body background color
      primary: '#00ADB5', //first special color
      secondary: '#393E46' //primary color for background to modals..
    }
  },
  shortcuts: [
    {
      secondary: 'rounded-6px p-16px border-primary border-1px bg-secondary'
    }
  ],
  presets: [
    presetUno(),
    presetWebFonts({
      fonts: {
        lato: [
          {
            name: 'Lato',
            weights: ['400', '600', '700'],
            italic: true
          },
          {
            name: 'sans-serif',
            provider: 'none'
          }
        ]
      }
    })
  ]
})
