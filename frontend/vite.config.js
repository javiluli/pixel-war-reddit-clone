import { defineConfig } from 'vite'
import path from 'path'
/* eslint-disable no-undef */
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/socket.io': {
        target: 'http://localhost:4000/',
        sw: true,
      },
    },
  },
  resolve: {
    alias: {
      '@@': path.resolve(__dirname, 'src'),
      '@@styles.css': path.resolve(__dirname, 'src/assets/styles'),
      '@@images': path.resolve(__dirname, 'src/assets/images'),
      '@@components': path.resolve(__dirname, 'src/components'),
      '@@constants': path.resolve(__dirname, 'src/constants'),
      '@@hooks': path.resolve(__dirname, 'src/hooks'),
      '@@zstores': path.resolve(__dirname, 'src/store'),
      '@@data': path.resolve(__dirname, 'src/data'),
      '@@error': path.resolve(__dirname, 'src/error'),
      '@@pages': path.resolve(__dirname, 'src/pages'),
      '@@services': path.resolve(__dirname, 'src/services'),
      '@@themes': path.resolve(__dirname, 'src/themes'),
    },
  },
})
