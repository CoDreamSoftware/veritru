/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    env: {
        INFURA_API_KEY: process.env.INFURA_API_KEY,
        INFURA_IPFS_ID: process.env.INFURA_IPFS_ID,
        INFURA_IPFS_SECRET: process.env.INFURA_IPFS_SECRET,
        MNEMONIC_KEY: process.env.MNEMONIC_KEY,
        CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
        MONGODB_URI: process.env.MONGODB_URI,
    }
}

module.exports = nextConfig