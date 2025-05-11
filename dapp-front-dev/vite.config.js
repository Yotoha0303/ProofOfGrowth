import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(),],
  define: {
    'process.env': process.env,
  },
  // server: {
  //   proxy: {
  //     '/nft': {
  //       target: 'https://api.nft.storage',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/nft/, ''),
  //     },
  //   },
  // },
})
