import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	server: {
		proxy: {
			'/api': {
				target: 'https://one23-v1-0.onrender.com',
				changeOrigin: true,
				secure: false, // якщо HTTPS без валідного сертифіката — можна залишити
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
})
