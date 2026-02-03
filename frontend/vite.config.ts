import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'


export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd())

  return {
    plugins: [react()],
    base: './',
    server: {
      port: 5173,
      proxy:
        mode === 'development'
          ? {
              '/api': {
                target: String(env.VITE_SERVER_URL),
                changeOrigin: true,
                rewrite: (p : string) => p.replace(/^\/api/, ''),
              },
            }
          : undefined,
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
  }
})
