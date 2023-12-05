import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server:{
    port:2001,
    proxy:{
      '/api':{
        target:'https://localhost:3000',
        changeOrigin:true
      },
    },
  },
})
