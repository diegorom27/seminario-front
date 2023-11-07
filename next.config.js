/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'www.udistrital.edu.co',
            port: '',
            pathname: '/themes/custom/versh/logo.png',
          },
        ],
      },
}

module.exports = nextConfig
