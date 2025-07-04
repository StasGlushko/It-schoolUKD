import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
	plugins: [react()],
	base: '/It-schoolUKD/',
	server: {
		proxy: {
			'/api': {
				target: 'https://ukd-it-school.onrender.com',
				changeOrigin: true,
				secure: false, // якщо HTTPS без валідного сертифіката — можна залишити
				rewrite: path => path.replace(/^\/api/, ''),
			},
		},
	},
})
