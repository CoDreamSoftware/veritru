import { ethers } from "ethers"

const API_KEY = process.env.INFURA_API_KEY
const GANACHE_URL = process.env.GANACHE_URL

let provider

// Let user interact with metamask provider
if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    // We are in the browser and metamask is running.
    window.ethereum.request({ method: "eth_requestAccounts" })
    provider = new ethers.providers.Web3Provider(window.ethereum)
}

// If using Ganache during development
else if (process.env.NODE_ENV === "development") {
    provider = new ethers.providers.JsonRpcProvider(GANACHE_URL)
}

// Use Infura Provider instead
else {
    // We are on the server *OR* the user is not running metamask
    provider = new ethers.providers.InfuraProvider('goerli', API_KEY)
}

// Export a function to get the provider
export function getProvider() {
    return provider
}