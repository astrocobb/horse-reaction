import type { Config } from '@react-router/dev/config'


export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,

  // Nginx terminates HTTPS and forwards plain HTTP to the container, so the server sees
  // request URLs like http://localhost:3000 while browsers send Origin: https://huskydrilling.com.
  // React Router's CSRF check rejects that mismatch with a 400 unless the origin is listed here.
  allowedActionOrigins: [ 'huskydrilling.com', 'www.huskydrilling.com' ]
} satisfies Config
