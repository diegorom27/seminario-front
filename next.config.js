/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'laud.udistrital.edu.co',
            port: '',
            pathname: '/sites/default/files/imagen-noticia/2022-09/LAUD%20Maestr%C3%ADa%20en%20Investigaci%C3%B3n%20Social_0.png',
          },
        ],
      },
}

module.exports = nextConfig
