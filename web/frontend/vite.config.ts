import { defineConfig } from 'vite'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import https from 'https'
import vue from '@vitejs/plugin-vue'
import tsconfigPaths from 'vite-tsconfig-paths'
import VueRouter from 'unplugin-vue-router/vite'

console.log(
	process.env.HOST,
	process.env.BACKEND_PORT,
	process.env.FRONTEND_PORT,
	process.env.HMR_PORT
)
if (
	process.env.npm_lifecycle_event === 'build' &&
	!process.env.CI &&
	!process.env.SHOPIFY_API_KEY
) {
	console.warn(
		'\nBuilding the frontend app without an API key. The frontend build will not run without an API key. Set the SHOPIFY_API_KEY environment variable when running the build command.\n'
	)
}

const proxyOptions = {
	target: `http://127.0.0.1:${process.env.BACKEND_PORT}`,
	changeOrigin: false,
	secure: true,
	ws: false,
}

const host = process.env.HOST
	? process.env.HOST.replace(/https?:\/\//, '')
	: 'localhost'

let hmrConfig
if (host === 'localhost') {
	hmrConfig = {
		protocol: 'ws',
		host: 'localhost',
		port: process.env.HMR_PORT,
		clientPort: process.env.HMR_PORT,
	}
} else {
	hmrConfig = {
		protocol: 'wss',
		host: host,
		port: process.env.HMR_PORT,
		clientPort: 443,
	}
}

export default defineConfig({
	root: dirname(fileURLToPath(import.meta.url)),
	plugins: [vue(), tsconfigPaths(), VueRouter({})],
	define: {
		'process.env.SHOPIFY_API_KEY': JSON.stringify(
			process.env.SHOPIFY_API_KEY
		),
	},
	resolve: {
		preserveSymlinks: true,
	},
	server: {
		host: 'localhost',
		port: parseInt(process.env.FRONTEND_PORT),
		hmr: hmrConfig,
		proxy: {
			'^/(\\?.*)?$': proxyOptions,
			'^/api(/|(\\?.*)?$)': proxyOptions,
		},
	},
})
