import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig, loadEnv } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'


export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  // Expose server-only env vars to process.env during dev
  for (const key of ['EMAILJS_SERVICE_ID', 'EMAILJS_TEMPLATE_ID', 'EMAILJS_PUBLIC_KEY', 'EMAILJS_PRIVATE_KEY', 'TURNSTILE_SITE_KEY', 'TURNSTILE_SECRET_KEY']) {
    if (env[key]) process.env[key] = env[key]
  }

  return {
    plugins: [
      tailwindcss(),
      reactRouter(),
      tsconfigPaths()
    ]
  }
})