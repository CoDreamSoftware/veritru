/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
    reactStrictMode: true,
    compiler: { removeConsole: isProd ? true : false },
    assetPrefix: isProd ? 'https://veritru.vercel.app' : 'http://localhost:3000',
    images: {
        dangerouslyAllowSVG: true,
        contentDispositionType: 'attachment',
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },
    env: {
        INFURA_API_KEY: process.env.INFURA_API_KEY,
        INFURA_IPFS_ID: process.env.INFURA_IPFS_ID,
        INFURA_IPFS_SECRET: process.env.INFURA_IPFS_SECRET,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        MONGODB_URI: process.env.MONGODB_URI,
        PRIVATE_KEY: process.env.PRIVATE_KEY,
        CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
        GOOGLE_EMAIL_ADDRESS: process.env.GOOGLE_EMAIL_ADDRESS,
        GOOGLE_APP_PASSWORD: process.env.GOOGLE_APP_PASSWORD,
    }
}

module.exports = nextConfig