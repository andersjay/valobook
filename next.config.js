/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'media.valorant-api.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static1-br.millenium.gg',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.nerddisse.com.br',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static1-us.millenium.gg',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.imgur.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'imgur.com',
        port: '',
        pathname: '/**',
      }
      
      

    ],
  },
}



module.exports = nextConfig

